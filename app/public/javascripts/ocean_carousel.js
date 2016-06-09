(function($, IBM) {

  var me = IBM.namespace(IBMCore, "common.widget.ocean_carousel"),
      images_manager = IBM.common.util.ocean_images_manager,
      browser = IBM.common.utils.browser;

  me.events = IBM.common.util.eventCoordinator(me, 'ocean_carousel', [
    'carousel:change',
    'carousel:swipe',
    'carousel:click'
  ]);

  $(function() {

    //$(window).load(function() {
      var carouselElement = $('.ocean-carousel');

      // if homepage then randomize offer order before carousel init
      var hpCarousel = $("#ocean-hero");
      var autoPlayVideo = false;
      var keepCarouselItemsInOrderCount = 2; // 1 = keep first item in position, 2 = keep first 2 items...
      if (hpCarousel.length > 0) {
       autoPlayVideo = true;
       var slides = hpCarousel.find('.ocean-hero');
       slides.slice(keepCarouselItemsInOrderCount, slides.length).sort(function(){
           return Math.random()*10 > 5 ? 1 : -1;
       }).each(function(){
           $(this).appendTo( $(this).parent() );
       });
      }
      var loadThreshold = 8000;
      // loadEventEnd - navigationStart
      var loadtime = 9000; // oh a guess... default dont load if we dont have perf.timing

      var autoPlaySpeed = 16000;
      if (!!window.performance) {
        loadtime = performance.timing.loadEventStart - performance.timing.navigationStart;
      }
      // console.log("CAROUSEL CHECK LOADTIME:", loadtime);
      if (loadtime > loadThreshold) {
        console.warn('Load time exceeds threshold for homepage background video, sorry');
        autoPlayVideo = false;
        autoPlaySpeed = autoPlaySpeed / 2;
      }

      var heroVideo;
      // if (homepage)
      function toggleHomeVideo(state){
        // var videl = document.getElementById('hero-video');
        if (heroVideo.length === 0) return;
        if (state) {
          heroVideo[0].play();
        } else {
          heroVideo[0].pause();
        }
      }
      
      function carouselInit(evt, slick){
        if (autoPlayVideo) {
          // TODO refactor - draft of a 'replace image with video if we are good to load it'
          // var videl = document.getElementById('hero-video');
          // if (videl) videl.play();
          //#hero-video-template inject into #hero-video-poster parent
          var vidTemplate = $('#hero-video-template');
          vidTemplate.parent().append(vidTemplate.html());
          // on video load
          heroVideo = $("#hero-video");
          heroVideo.on('canplay', function(){
            // console.log('video can play OK');
            // remove vid poster & playback start
            $(this).show()[0].play();
            // $("#hero-video-poster").addClass('ibm-hidden-medium ibm-hidden-large ibm-hidden-xlarge');
            
          })
        }
        
      }

      //load images in the first two carousel items
      images_manager.load(carouselElement.children().first());
      images_manager.load(carouselElement.children().last());
      images_manager.load(carouselElement.children().eq(1));

      carouselElement.on('init', carouselInit);
      carouselElement.carousel({
        accessibility: true,
        pauseOnHover: false,
        customPaging: function(slider, i) {
          //- console.log('custom paging go:', slider, i);
          var total = slider.slideCount;
          var str = (i + 1) + " / " + total;
          return '<span>' + str + '</span><button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + (i + 1) + '</button>';
        },
        prevArrow: '<button type="button" data-role="none" class="ibm-carousel-prev ocean-carousel-prev" aria-label="previous">Previous</button>',
        nextArrow: '<button type="button" data-role="none" class="ibm-carousel-next ocean-carousel-next" aria-label="next">Next</button>',
        arrows: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: autoPlaySpeed,
        autoplayspeed: autoPlaySpeed,
      });

      function checkCarouselInView(){
        // if we are not visible due to scroll then pause - do everywhere please
        if (!IBMCore.common.util.scrolledintoview(carouselElement)) {
       
          // console.log("CAROUSEL OUTVIEW");
          carouselElement.slick('slickPause');
        }
        // if (autoPlayVideo) {
        //   if (IBMCore.common.util.scrolledintoview(heroVideo)) {
        //     console.log('play video it is in view');
        //     toggleHomeVideo(true);
        //   } else {
        //     console.log('pause video it is out of view');
        //     toggleHomeVideo(false);
        //   }
        // }
      }


      carouselElement.on('afterChange', function(event, slick, currentSlide){
        console.log('carousel afterChange:', currentSlide);
        me.events.publish('carousel:change', slick);
        

        var nextSlide = currentSlide + 1;
        var previousSlide = currentSlide - 1 >= 0 ? currentSlide - 1 : (slick.slideCount - 1);

        //TODO: should keep track of loaded items and stop doing this when we are done 
        if (nextSlide <= slick.slideCount) {
          images_manager.load(slick.$slides[nextSlide]);
          images_manager.load(slick.$slides[previousSlide]);
        }

        // pause video if exists and not on first slide
        if (autoPlayVideo) {
          toggleHomeVideo((currentSlide === 0));
          // toggleHomeVideo();
        }
      });
      carouselElement.on('swipe', function(event, slick){
        // console.log("CAROUSEL SWIPE");
        me.events.publish('carousel:swipe', slick);
      });
      
        // console.log('carousel init ok:', carouselElement.find('button'));
        carouselElement.find('button').click(function(evt){
          // console.log("CAROUSEL CLICK");
          me.events.publish('carousel:click', evt);  
        });
      
      var $pag = $('<div id="ocean-hero-pagination"></div>');
      $('.ocean-carousel-next, .ocean-carousel-prev, .slick-dots').appendTo($pag);
      carouselElement.append($pag);
      var w = $pag.width();
      var m = w*0.5*-1;
      m+=10; // fudge factor
      // console.log('data-center ?', carouselElement.data('center'));
      if (carouselElement.data('center') === true) {
        $($pag).css({
          'margin-left':m
        });  
      }
      
      browser.events.subscribe('update:scroll', 'browser', checkCarouselInView);
    //});
  });

})(jQuery,IBMCore);
