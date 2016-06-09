
/**
	
	Parallax scrolling widget for IBM Ocean. 

	@class IBMCore.common.widget.ocean_parallax

**/


(function($, IBM) {

    var me = IBM.namespace(IBM, "common.widget.ocean_parallax"),
      initted = false,
      inView = IBMCore.common.util.scrolledintoview,
      images_manager = IBM.common.util.ocean_images_manager,
      controller = null,
      browser = IBM.common.utils.browser,
      sitenav = IBM.common.widget.ocean_sitenav,
      stage_offset = 0,
      speed = 1.5,
      stageHeight = 0,
      itemHeight = 0,
      c_h = 0,
      $stage = null,
      $items = null,
      $photos = null,
      $photo_bands = null,
      $hero = null,
      $images_container = null,
      scenes = {},
      doHashUpdate = true;

    me.events = IBM.common.util.eventCoordinator(me, 'ocean_parallax', [
      'scene:end',
      'scene:enter'
    ]);

    function disable() {
      if (controller) {
        // console.log('parallax disabled');
        $('body').removeClass('parallax-enabled');
        controller = controller.destroy(true);;

        if ($stage) {
          $stage.css('height','');
        }
        if ($items) {
          $($items).unwrap('.ocean-item-wrapper');
          $items.removeAttr('style');
          $items.find('*').removeAttr('style');
        }
        if ($photo_bands) {
          //$photo_bands.css('display', 'none');
          //$photo_bands.removeAttr('style');
          //$photo_bands.find('.ocean-photo').removeAttr('style');
          $photo_bands.remove();
        }

        $items = null;
        $photo_bands = null;
        initted = false;
      }
    }

    function updateStageOffset() {
      stage_offset = $stage.offset().top;
    }
    function enable() {
      // console.log('parallax enabled');
      doInit();
    }
    function onSizeChange(results) {
      if (results.orientation !== 's' && results.orientation !== 'ms') {
        enable();
      } else {
        //console.log('parallax disable');
        disable();
      }
    }

    function update(browserObj) {
      //console.log('parallax updating');
      onSizeChange(browserObj);
    }

    function onSitenavClick(href, speed) {
      var speed = typeof speed !== 'undefined' ? speed : 1.5;
      var id = (href.replace('#', ''));
      var scene = scenes[id+'-fill-scene'];
      //to the bottom of the fill scene
      var to = scene.scrollOffset() + scene.duration();

      controller.scrollTo(to, {
        speed: speed
      });
    }

    function onHashChange(results, speed) {
      var speed = typeof speed !== 'undefined' ? speed : 2;

      if (typeof results.hashParams === 'string') {
        onSitenavClick(results.hashParams, speed);
      }
    }

    function bind() {
      sitenav.events.subscribe('sitenav:click', 'ocean_sitenav', onSitenavClick);
      browser.events.subscribe('update:hash', 'browser', onHashChange);
    }

    function onScrollTo(position, params) {

        if (params.speed > 0 && browser.get().scrollTop !== position) {
          doHashUpdate = false;
        }

        TweenMax.to(window, params.speed, {
          scrollTo : {
            y : position, // scroll position of the target along y axis
            autoKill : true // allows user to kill scroll action smoothly
          },
          ease : Cubic.easeInOut
        });

        //oncomplete doesnt fire if the change is too small
        TweenMax.delayedCall(params.speed, function() {
          doHashUpdate = true;
        });

    }
    function initController() {
      controller = new ScrollMagic.Controller({
        //addIndicators:true
      });

      controller.scrollTo(onScrollTo);
    }

    function initElements() {
      $stage = $('#ocean-parallax-container');
      $hero = $('#ocean-hero');

      updateStageOffset();

      if (!$items) {
        $items = $('.ocean-item');
        $items.each(function(i) {
          $(this).wrap('<div class="ocean-item-wrapper"></div>');
        });
      }

      $items.css('height', 'auto');

      itemHeight = $items.first().height();
      c_h = itemHeight * speed;

      $('.ocean-item-wrapper:not(:last-child)').css({
        'height': c_h,
        'position':'relative'
      });
      $('.ocean-item-wrapper:last-child').css({
        'height':itemHeight,
        'position':'relative'
      });

      if (!initted) {
        var items_length = $items.length - 1;
        var $body = $('body');
        $items.find('.ocean-photo-band').each(function(i) {
          var $p = $(this).clone();
          $p.attr('id', $p.attr('id') + '-copy');

          if (i === 0) {
            $p.children().first().css({
              transform:'translate3d(0,'+stage_offset+'px,0)'
            });
          } else {
            //$p.children().first().css({
            //  transform:'translate3d(0,130%,0)'
            //});
          }
          $body.append($p);
          images_manager.loadResponsive($p);
        });

        $photo_bands = $body.find('> .ocean-photo-band');
      }

      //prevents overlap
      $items.css('height', 0);
      
      initted = true;
    }

    function initScenes(updateOnly) {
      var updateOnly = typeof updateOnly !== 'undefined' ? updateOnly : false; 

      var last_item = $items.length - 1;
      var footer_height = $('footer').height();
      var browser_height = browser.get().height;

      $items.each(function(i) {
        var $el = $(this);
        var $container = $el.parent();
        var id = $el.attr('id').replace('ocean-item-', '');
        var $band = $el.find('.ocean-band');
        var band_height = $band.height();
        var $color_band = $el.find('.ocean-band-band');
        var $fill = $el.find('.ocean-shape-fill');
        var $stroke = $el.find('.ocean-shape-stroke');
        var $photo_band = $($photo_bands[i]);
        var $photo = $photo_band.find('.ocean-photo');

        var $next_photo = null;
        var next_index = null;
        if (typeof $items[i+1] !== 'undefined') {
          next_index = i+1;
          $next_photo = $($photo_bands.eq(next_index).find('.ocean-photo'));
        }


        //****** MAIN SCENES ******//
        
        var bandFrom = 200;
        var bandTo = i === last_item ? ((browser_height - footer_height) - band_height) : band_height * -1;

        var band_tween = TweenMax.fromTo($band, 1, {
          y: bandFrom,
          ease: Sine.easeOut 
        }, {
          y: bandTo,
          ease: Sine.easeOut 
        });

        if (updateOnly) {
          scenes[id].duration(c_h).setTween(band_tween);
        } else {
          scenes[id] = new ScrollMagic.Scene({
            triggerElement: $container[0],
            triggerHook: 0,
            duration: c_h
          }).setPin(this).setTween(band_tween).addTo(controller);

          scenes[id + '-bottom-enter'] = new ScrollMagic.Scene({
            triggerElement: $container[0],
            triggerHook: 0.25,
            duration: '75%' 
          }).addTo(controller);
        }

        //*****************************//

        //****** FILL SCENE ******//
        
        var fill_tween = TweenMax.to($fill, 1, {
          clip: 'rect(0px, ' + band_height + 'px, ' + band_height + 'px, 0px)',
          ease: Sine.easeInOut
        });

        var stroke_tween = TweenMax.to($stroke, 1, {
          clip: 'rect(0px, ' + band_height + 'px, 0px, 0px)',
          ease: Sine.easeInOut
        });

        var fillT = new TimelineMax();

        fillT.add([fill_tween, stroke_tween]);

        if (updateOnly) {
          scenes[id + '-fill-scene'].setTween(fillT);
        } else {
          scenes[id + '-fill-scene'] = new ScrollMagic.Scene({
            triggerElement: $container[0],
            triggerHook: 0.4,
            duration: '45%'
          }).setTween(fillT).addTo(controller);
        }

        //*****************************//

        //******* FIRST PHOTO SCENE **********//
        
        if (i === 0) {
          //TweenMax.set($photo, { css: { y: (stage_offset) } });
          var first_photo_tween = TweenMax.to($photo, 1, {
            y: 0,
            ease: Linear.easeNone
          });

          if (updateOnly) {
            scenes['first-item-photo'].duration(stage_offset).setTween(first_photo_tween);
          } else {
            scenes['first-item-photo'] = new ScrollMagic.Scene({
              duration: stage_offset
            }).setTween(first_photo_tween).addTo(controller);

            scenes[id].on('start', function(e) {
              if (e.scrollDirection === 'REVERSE') {
                TweenMax.set($photo, { css: { y: (stage_offset-5) } });
              }
            });
          }
        }

        //*****************************//

        //******** PHOTO SCALE SCENE ******//
        
        var photo_slow_tween = TweenMax.fromTo($photo, 1, {
          scale: 1.1,
          ease: Sine.easeOut
        },{
          scale: 1
        });
        var t = new TimelineMax();
        t.add(photo_slow_tween);

        var duration = c_h * 0.4;

        if (updateOnly) {
          scenes[id+'-photo-slow-tween'].setTween(t).duration(duration);
        } else {
          scenes[id+'-photo-slow-tween'] = new ScrollMagic.Scene({
            triggerElement: $container[0],
            triggerHook:0.8,
            duration:duration
          }).setTween(t).addTo(controller);
        }

        //*****************************//

        
        //*****  NEXT PHOTO SCENE *********//
        
        var onProgress = function() {
          var pin_point = itemHeight * 0.75,
              y = $band[0]._gsTransform.y,
              to = y+pin_point;
          
          if (to < 0) {
            to = 0;
          }
          
          TweenMax.set($next_photo, { css: { y: to } });
        };

        if ($next_photo && !updateOnly) {

          TweenMax.set($next_photo, { css: { y: browser_height * 1.5} });

          scenes[id].on('progress', onProgress);
          scenes[id+'-bottom-enter'].on('progress', onProgress);

          scenes[id+'-bottom-enter'].on('start', function(e) {
            var pin_point = itemHeight * 0.75;
            var y = $band[0]._gsTransform.y;
            var to = e.scrollDirection === 'REVERSE' ? (browser_height*1.2) : y+pin_point;

            TweenMax.set($next_photo, { css: { y: to } });

          });

          scenes[id].on('end', function(e) {
            var pin_point = itemHeight * 0.75;
            var y = $band[0]._gsTransform.y;
            var to = e.scrollDirection === 'FORWARD' ? 0 : y+pin_point;

            TweenMax.set($next_photo, { css: { y: to } });
          });

        }

        //*****************************//
        

        //***** MAIN SCENE EVENTS *********//
        
        if (!updateOnly) {
          var trackId = id;
          scenes[id].on("end", function(evt){
            // following purely for aiding in analytics
            evt.trackId = trackId;
            // console.log('band end for track:', evt.trackId); 
            me.events.publish('scene:end', evt);
          });

          scenes[id].on("enter", function(evt){
            evt.trackId = trackId;
            me.events.publish('scene:enter', evt);

            if (doHashUpdate) {
              browser.updateHash(id, true);
            }
          });
        }

        //*****************************//

      
      });
      
    }

    function initTabletParallax() {
      initController();

      var $i = $('.ocean-item');

      $i.each(function() {

        var $t = $(this);
        var h = $t.height();

        var $fill = $t.find('.ocean-shape-fill');
        var $stroke = $t.find('.ocean-shape-stroke');

        var fill_tween = TweenMax.to($fill, 1, {
          clip: 'rect(0px, ' + h + 'px, ' + h + 'px, 0px)',
          ease: Sine.easeInOut
        });

        var stroke_tween = TweenMax.to($stroke, 1, {
          clip: 'rect(0px, ' + h + 'px, 0px, 0px)',
          ease: Sine.easeInOut
        });

        var fillT = new TimelineMax({
          paused: true
        });

        fillT.add([fill_tween, stroke_tween]);

        var mobile_scene = new ScrollMagic.Scene({
          triggerElement: $t[0],
          triggerHook: 0
        }).addTo(controller).on('enter', function() {
          fillT.play();
        });
      });
    }

    function initMobileDeferredLoad() {
      $items = $('.ocean-item');
      var itemLength = $items.length;

      var doLoad = function(i) {
        if (i > itemLength) {return;}
        images_manager.loadResponsive($items[i]);

        requestAnimationFrame(function() {
          doLoad(++i);
        });
      };
  
      doLoad(0);
    }

    function doInit() {

      if (!$stage || isMobile.any) {
        if (isMobile.tablet) {
          //initTabletParallax();
        }
        return;
      }

      var orientation = browser.get().orientation;
      if (orientation === 's' || orientation === 'ms') return;

      $('body').addClass('parallax-enabled');
      initElements();
      if (!controller) {
        initController();
        initScenes();
      } else {
        initScenes(true);
      }

      if (!initted) {
        onHashChange(browser.get());
      }
    }

    me.init = function (stageElement) {
      var orientation = browser.get().orientation;

      if (stageElement.length === 0) {
        return;
      } else if (isMobile.any) {
        if (orientation !== 's' && orientation !== 'ms') {
          initMobileDeferredLoad();
        }
        return;
      }

      $stage = stageElement; // so we can control what pages we init on.
      window.scrollTo(0,0);
      bind();
      //doInit();
    };

    me.update = update;

})(jQuery, IBMCore);



