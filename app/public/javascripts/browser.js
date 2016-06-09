
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

(function($, IBM) {
    
  var me = IBM.namespace(IBM, "common.utils.browser");

  /**
   * This allows us to not call a function but once ever Xms (used for scroll and resize events)
   */
  
  var throttle = (function () {
          return function (fn, delay) {
              delay || (delay = 100);
              var last = (function () {
                  return +new Date();
              })(),
                  timeoutId = null;
  
              return function () {
                  var args = arguments;
                  if (timeoutId) {
                      clearTimeout(timeoutId);
                      timeoutId = null;
                  }
  
                  var now = (function () {
                      return +new Date();
                  })();
                  if (now - last > delay) {
                      fn.apply(this, args);
                      last = now;
                  } else {
                      timeoutId = setTimeout(function () {
                          fn.apply(this, args);
                      }, delay);
                  }
              };
          };
  })();
  /**
   * Continually updated Browser information (dimensions, scroll, hashParams, queryParams, etc)
   * @module Browser 
   */
  
  var width = 0,
      height = 0,
      scrollTop = 0,
      scrollDirection = 'forward',
      orientation = null,
      orientationDirection = 'static',
      previousOrientation = null,
      orientations = ['xh','h','xxl','xl','l','m','ms','s'],
      layout = 'portrait',
      $win = $(window),
      $htmlbody = $('html,body'),
      $responsiveElem = $('<div id="responsive-test-elem"></div>'),
      $stickyFilterElem = null,
      stickyFilterStuck = false,
      queryParams = {},
      hashParams = {},
      os = 'os-'+navigator.platform;
  
  /**
   * Initialize
   */
  function init() {
      queryParams = getQueryParams();
      hashParams = getHashParams();
      $('body').append($responsiveElem).addClass(os);
      bind();
  
      //go ahead and fire these so we can get some initial values
      onResize();
      onScroll();
  }
  
  /**
   * Bind events!
   */
  function bind() {
      //throttle scroll and resize events so they dont run everytime
      $win.on('scroll', throttle(onScroll, 5));
      $win.on('resize', throttle(onResize, 200));
      $win.on('hashchange', onHashChange);
  }
  
  /**
   * Stuff that happens when we change the hash value
   */
  function onHashChange() {
      hashParams = getHashParams();
      me.events.publish('update:hash', get());
      //$.publish('browser:update:hash', get());
  }

  function checkHash() {
      onHashChange(); 
  }
  
  /**
   * When user scrolls, update scroll value and fire off event.  Throttled a little bit, so doesnt fire every time
   */
  function onScroll(e) {
      var old = scrollTop;
  
      scrollTop = $win.scrollTop();
  
      if (old !== scrollTop) {
          if (old < scrollTop) {
            scrollDirection = 'forward';
          } else {
            scrollDirection = 'reverse';
          }
          me.events.publish('update:scroll', get());
          //$.publish('browser:update:scroll', get());
      }
  }
  
  /**
   * get params from serialized string
   */
  //http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
  function getParams(str) {
      if (str == "") return {};
      var b = {};
      for (var i = 0; i < str.length; ++i)
      {
          var p=str[i].split('=');
          if (p.length != 2) continue;
          b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
      }
      return b;
  }
  
  /**
   * gets hash params
   */
  function getHashParams() {
      var h = window.location.hash.split('#'),
          params = {};

      if (h.length === 2) {
          h = h[1];
          params = h.match('&') ? (getParams(h.split('&'))) : h;
      }
  
      return params;
  }
  
  /**
   * gets query params
   */
  function getQueryParams() {
      return getParams(window.location.search.substr(1).split('&'));
  }
  
  function updateHash(params, silent) {
  
      var str = '';

      silent = typeof silent === 'undefined' ? false : silent;
  
      if (params.match('&')) {
        $.extend(hashParams, params, true);
  
        for (var param in hashParams) {
            // for now, only do this for non-empty values
            //if (hashParams[param] !== '') {
            str += param+'='+hashParams[param]+'&';
            //}
        }
        str = str.substr(0,str.length-1);
      } else {
        str = params;
      }
  
      if (silent) {
          console.log('SILENT');
          $win.off('hashchange', onHashChange);
          window.location.hash = '#' + str;
          //delay adding this back, because event is async
          setTimeout(function() {
            $win.on('hashchange', onHashChange);
          }, 500);
      } else {
        window.location.hash = '#' + str;
      }
  }
  
  /**
   * get current display size
   */
  function getOrientation() {
      var w = parseInt($responsiveElem.css('width'),10),
          returnVal = 'm';
  
      //console.log(orientations);
      //console.log(orientations[w-1]);
      return typeof orientations[w-1] !== 'undefined' ? orientations[w-1] : 'm';
  }
  
  /**
   * When user resizes the browser, update dimensions and fire off event.  Throttled a little bit, so doesnt fire every time.  Also checks for orientation breaks and fires events on those changes.
   */
  function onResize(e) {
      var oldH = height;
      var oldW = width;
      var oldOrientation = orientation;
      width = $win.outerWidth();
      height = $win.outerHeight();
      orientation = getOrientation();
  
      if (width !== oldW || height !== oldH) {
          me.events.publish('update:size', get());
          //$.publish('browser:update:size', get());
      }
  
      if (oldOrientation !== orientation) {
          orientationDirection = oldOrientation ? (orientations.indexOf(orientation) < orientations.indexOf(oldOrientation) ? 'larger' : 'smaller') : 'static';
          previousOrientation = oldOrientation ? oldOrientation : orientation;
          me.events.publish('update:orientation', get());
          //$.publish('browser:update:orientation', get());
      } else {
        orientationDirection = 'static';
        previousOrientation = orientation;
      }

      layout = width > height ? 'landscape' : 'portrait';

      $('body').attr('data-ocean-layout', layout);
      //console.log('resize',orientation);
  }
  
  /**
   * get all current values
   */
  function get() {
      return {
          width: width,
          height: height,
          scrollTop: scrollTop,
          orientation: orientation,
          orientationDirection: orientationDirection,
          previousOrientation: previousOrientation,
          queryParams: queryParams,
          hashParams: hashParams,
          scrollDirection: scrollDirection,
          layout:layout
      };
  }
  
  /**
   * Scroll to a particular elem
   * @param {element} elem Element to scroll to
   * @param {function} onComplete Stuff to fire when we are done
   */
  function scrollTo(elem, onComplete) {
      var onComplete = (typeof onComplete === 'undefined' ? (function() {}) : onComplete),
          offset = (typeof elem === 'number' ? elem : ($(elem).offset().top));
  
      $('html,body').animate({scrollTop:offset}, '500', 'swing', onComplete);
  }

  me.events = IBM.common.util.eventCoordinator(me, 'browser', [
    'update:size',
    'update:orientation',
    'update:scroll',
    'update:hash'
  ]);
  me.get = get;
  me.onResize = onResize;
  me.scrollTo = scrollTo;
  me.updateHash = updateHash;
  me.checkHash = checkHash;
  
  $(function() {
    init();
  });
  
  //module.exports = {
  //    get: get,
  //    onResize: onResize,
  //    scrollTo: scrollTo,
  //    updateHash: updateHash
  //};

})(jQuery, IBMCore);
