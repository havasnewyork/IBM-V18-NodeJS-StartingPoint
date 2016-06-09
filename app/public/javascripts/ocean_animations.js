(function($, IBM) {
    
  var me = IBM.namespace(IBM, "common.widget.ocean_animations"),
      carousel = IBM.common.widget.ocean_carousel,
      browser = IBM.common.utils.browser,
      ANIMATIONS = {};
  

  ANIMATIONS.bluemix = (function() {
    var $elem = null,
        $bottom = null,
        $top = null,
        selector = '[data-id="ocean-hero-bluemix"] .ocean-hero-animation',
        timeline = null;

    function init() {
      $elem = $(selector);

      initParts();
      initTimeline();
    }

    function play() {
      timeline.play();
    }
    
    function initParts() {
      $top = $elem.find('#bluemix-animation-top');
      $bottom = $elem.find('#bluemix-animation-bottom');
    }

    function initTimeline() {
      timeline = new TimelineLite({
        paused:true,
      }); 
      timeline.fromTo($top, 1, {ease: Sine.easeOut, transform:'translate3d(0, 1000px, 0)'}, {transform:'translate3d(0, 0, 0)'});
      timeline.fromTo($bottom, 1.5, {ease: Sine.easeOut, transform:'translate3d(0, 1000px, 0)'}, {transform:'translate3d(0, 0, 0)'},0);
    }

    return {
      init: init,
      play: play
    };
  })();

  ANIMATIONS.developerworks = (function() {
    var $elem = null,
        $hero = null,
        $wrapper = null,
        $base = null,
        $shadow = null,
        $pass = null,
        selector = '[data-id="ocean-hero-developerworks"] .ocean-hero-animation',
        timeline = null,
        baseW = 1144,
        minW = 957,
        baseH = 678;

    function init() {
      $elem = $(selector);
      $wrapper = $elem.find('#dw-animation-wrapper');
      $hero = $('#ocean-hero'); 
      initParts();
      initTimeline();
      onSizeChange();

      browser.events.subscribe('update:size', 'browser', function() {
        setTimeout(onSizeChange, 100);
      });
    }

    function onSizeChange() {
      //Simplest way to make this responsive is to scale it.  The base animation is all done via px.
      var orientation = browser.get().orientation;

      var w = ($hero.width()/2),
          h = $hero.height();

      var scale = ((minW/baseW));
      if (orientation === 's' || orientation === 'ms' || orientation === 'm') {
        scale = ((w/baseW) * 1.2);
      }

      var newW = baseW * scale,
          newH = baseH * scale;

      var marginTop = h*0.2;
      if (orientation === 's' || orientation === 'ms' || orientation === 'm') {
        marginTop = ((h*0.5) - (newH * 0.5));
      }
      var marginLeft = (((newW)-w)*-1);

      $wrapper.css({
        'transform':'scale('+scale+')',
        'margin-top':marginTop,
        'margin-left':marginLeft
      });
    }

    function play() {
      timeline.play();
    }
    
    function initParts() {
      $base = $elem.find('#dw-animation-base');
      $shadow = $elem.find('#dw-animation-shadow');
      $pass = $elem.find('#dw-animation-pass');
    }

    function initTimeline() {
      timeline = new TimelineLite({
        paused:true,
      }); 
      


      timeline.fromTo($base, 0.6, {ease: Sine.easeOut, transform:'translate3d(0, 1000px, 0)'}, {transform:'translate3d(0, 0, 0)'});
      timeline.fromTo($pass, 1, {ease: Expo.easeOut, transform:'translate3d(0, -1000px, 0)'}, {transform:'translate3d(0, 0, 0)'}, '+=0.3');
      timeline.fromTo($shadow, 0.8, {ease: Expo.easeIn, transform:'translate3d(0, -45px, 0)', opacity: 0}, {transform:'translate3d(0, 0, 0)', opacity: 1}, '-=0.5');
    }

    return {
      init: init,
      play: play
    };
  })();

  ANIMATIONS.maturity = (function() {
    var $elem = null,
        $image = null,
        timeline = null,
        selector = '[data-id="ocean-hero-maturity"] .ocean-hero-animation';

    function init() {
      $elem = $(selector);

      //TEMPORARY
      //elem.on('click', function() {
      // timeline.restart();
      //);
      initParts();
      initTimeline();
    }

    function play() {
      console.log(timeline);
      timeline.play();
    }

    function initParts() {
      $image = $elem.find('#maturity-animation-image');
    }

    function initTimeline() {
      timeline = new TimelineLite({
        paused:true,
      }); 
      timeline.fromTo($image, 0.6, {ease: Expo.easeOut, transform:'translate3d(0, 1000px, 0)'}, {transform:'translate3d(0, 0, 0)'});
    }

    return {
      init: init,
      play: play
    };
  })();

  ANIMATIONS.watson = (function() {
    var $elem = null,
        $wrapper = null,
        $hero = null,
        $logo = null,
        $rays = null,
        $bubble = null,
        $shadow = null,
        $text = null,
        timeline = null,
        selector = '[data-id="ocean-hero-watson"] .ocean-hero-animation',
        baseW = 1144,
        minW = 957,
        baseH = 678;

    function init() {
      $elem = $(selector);
      $wrapper = $elem.find('#watson-animation-wrapper');
      $hero = $('#ocean-hero'); 

      initParts();
      initTimeline();
      onSizeChange();

      browser.events.subscribe('update:size', 'browser', function() {
        setTimeout(onSizeChange, 100);
      });
    }

    function onSizeChange() {
      //Simplest way to make this responsive is to scale it.  The base animation is all done via px.
      var orientation = browser.get().orientation;

      var w = ($hero.width()/2),
          h = $hero.height();

      var scale = ((minW/baseW));
      if (orientation === 's' || orientation === 'ms' || orientation === 'm') {
        scale = ((w/baseW) * 1.2);
      }

      var newW = baseW * scale,
          newH = baseH * scale;

      var marginTop = h*0.2;
      if (orientation === 's' || orientation === 'ms' || orientation === 'm') {
        marginTop = ((h*0.5) - (newH * 0.5));
      }
      var marginLeft = (((newW)-w)*-1);

      $wrapper.css({
        'transform':'scale('+scale+')',
        'margin-top':marginTop,
        'margin-left':marginLeft
      });
    }

    function play() {
      timeline.play();
    }

    function initParts() {
      $logo = $elem.find('#watson-animation-logo');
      $rays = $elem.find('.watson-animation-ray');
      $bubble = $elem.find('#watson-animation-bubble');
      $shadow = $elem.find('#watson-animation-shadow');
      $text = $elem.find('#watson-animation-text');
      $text2 = $elem.find('#watson-animation-text2');
    }

    function initTimeline() {
      timeline = new TimelineLite({
        paused:true,
      }); 
      timeline.fromTo($logo, 0.6, {ease: Expo.easeOut, transform:'skew(55deg, -218deg) rotate(31deg)'}, {transform:'skew(55deg, -218deg) rotate(46deg)'});
      timeline.fromTo($rays, 0.6, {ease: Expo.easeOut, transform:'scale(0.2)'}, {transform:'scale(1)'}, 0);
      timeline.fromTo($bubble, 1, {ease: Expo.easeOut, transform:'translate3d(0, -1000px, 0)'}, {transform:'translate3d(0, 0, 0)'}, '+=0.3');
      timeline.fromTo($shadow, 0.5, {ease: Expo.easeIn, transform:'translate3d(0, -45px, 0)', opacity: 0}, {transform:'translate3d(0, 0, 0)', opacity: 1}, '-=0.5');
      timeline.fromTo($text, 2, {ease: Expo.easeIn, clip:'rect(0px, 0px, 10000px, 0)'}, {clip:'rect(0px, 400px, 10000px, 0)'});
      timeline.fromTo($text2, 3, {ease: Expo.easeIn, clip:'rect(0px, 0px, 10000px, 0)'}, {clip:'rect(0px, 400px, 10000px, 0)'});
    }

    return {
      init: init,
      play: play
    };
  })();


  function onCarouselChange(slickObj) {
    var slide = slickObj.$slides[slickObj.currentSlide],
        id = slide.getAttribute('data-id').replace('ocean-hero-','');
    
    if (typeof ANIMATIONS[id] !== 'undefined') {
      ANIMATIONS[id].play();
    }
  }

  function bind() {
    carousel.events.subscribe('carousel:change', 'ocean_carousel', onCarouselChange);
  }

  function initAnimations() {
    for (var anim in ANIMATIONS) {
      ANIMATIONS[anim].init();
    }
  }

  function init() {
    initAnimations();
    bind();
  }

  me.init = init;

})(jQuery, IBMCore);

