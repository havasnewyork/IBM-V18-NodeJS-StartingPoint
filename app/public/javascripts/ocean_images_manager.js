(function($, IBM) {
    

  // for now, this must be utilized by each module to load its images
  
  var me = IBM.namespace(IBM, "common.util.ocean_images_manager"),
      browser = IBM.common.utils.browser,
      breakpoints = {
        's':'l',
        'ms':'l',
        'm':'l',
        'l':'l',
        'xl':'xl',
        'xxl':'xl',
        'h':'xl',
        'xh':'xl'
      },
      $elems = [],
      orientation = 'm';

  var images = [
    {
      selector:'#some-selector',
      image:'/images/path.png',
      breakpoints:[]
    }
  ];
  
  function getResponsiveImagePath(path) {
    var sizeToUse = breakpoints[orientation];
    var p = path.split('.');

    return p[0] + '_' + sizeToUse + '.' + p[1];
  }

  function onOrientationChange(results) {
    orientation = results.orientation;
    $elems.forEach(function(elem) {
      if ($(elem).attr('data-ocean-img-responsive') === 'true') {
        updateElement(this);
      }

    });
  }

  function updateElement(elem, responsive) {
    var $e = $(elem);
    var img = $e.attr('data-img');

    if (img) {
      responsive = typeof responsive !== 'undefined' ? responsive : false;

      if (responsive) {
        img = getResponsiveImagePath(img);
      }

      // console.log('setting background image on: ', $e[0], img);
      $e.css({
        'background-image':'url('+img+')'
      });
    }
  }

  function loadResponsive(elem, deep) {
    //console.log('load responsive', elem);
    var deep = typeof deep !== 'undefined' ? deep : true;

    load(elem, true, deep);
  }

  function load(elem, responsive, deep) {
      var $e = $(elem),
          newElems = [],
          responsive = typeof responsive !== 'undefined' ? responsive : false,
          deep = typeof deep !== 'undefined' ? deep : true;

      if ($e.attr('data-img')) {
        newElems.push($e[0]);
      }

      if (deep) {
        var children = $e.find('[data-img]');

        children.each(function() {
          newElems.push(this);
        });
      }


      newElems.forEach(function(el) {
  
        if (el.getAttribute('data-ocean-img-loaded') !== 'true') {
          updateElement(el, responsive);

          el.setAttribute('data-ocean-img-responsive', responsive);
          el.setAttribute('data-ocean-img-loaded', 'true');

          $elems.push(el);
        }
      });

  }

  function bind() {
    browser.events.subscribe('update:orientation', 'browser', onOrientationChange);
  }

  function init() {
    onOrientationChange(browser.get());
    bind();
  }

  me.init = init;
  me.load = load;
  me.loadResponsive = loadResponsive;

})(jQuery, IBMCore);

