
/**
	
	Parallax scrolling widget for IBM Ocean. 

	@class IBMCore.common.widget.ocean_parallax

**/

(function($, IBM) {

    var me = IBM.namespace(IBM, "common.widget.responsive_homepage"),
        browser = IBM.common.utils.browser,
        parallax = IBM.common.widget.ocean_parallax,
        browserResults = null,
        orientation = null,
        browserHeight = 0,
        browserWidth = 0,
        $items = null,
        $shapes = null,
        $drawer = null,
        $hero = null,
        $quicklinks = null;

    function bind() {
      browser.events.subscribe('update:size', 'browser', onSizeChange);
    }

    function initQuickLinks() {
      $quicklinks = $('.ocean-item-subnav-container [data-widget="showhide"]');
      if ($quicklinks) {
        $quicklinks.each(function() {
          var $body = $(this).find('.ibm-container-body');
          var $a = $(this).find('h2 a');

          //some race condition.  look into
          setTimeout(function() {
			      $body.slideUp();
          }, 100);
          $a.removeClass('ibm-show-active');
        });
      }
    }

    function onSizeChange(results) {
      browserResults = results;
      var oldOrientation = orientation;
      orientation = results.orientation;
      browserHeight = results.height;
      browserWidth = results.width;

      if (orientation === 'ms' || orientation === 's') {
        $hero.parent().before($drawer);

        if (oldOrientation && oldOrientation !== 'ms' && oldOrientation !== 's') {
          initQuickLinks();
        }
      } else {
        $hero.parent().after($drawer);
      }
      updateItems();
    }

    function updateItems() {

      var $firstItem = $($items[0]);
      var h = $firstItem.height();
      var $container = $('#ocean-parallax-container');
      
      if (browserWidth > 660) {
        $container.addClass('ocean-with-bands');
      } else {
        $container.removeClass('ocean-with-bands');
      }

      var center_width = $items.first().find('.ocean-center').removeAttr('style').width();



      //var minHeight = isMobile.phone ? 500 : 900;
      //var ratio = isMobile.phone ? 1.8 : 1.5;

      var minHeight = 900;
      var ratio = 1.5;

      $items.each(function() {
         var $item = $(this),
             $center = $item.find('.ocean-center'),
             $shapes = $item.find('.ocean-shape'),
             $fill = $shapes.filter('.ocean-shape-fill'),
             $stroke = $shapes.filter('.ocean-shape-stroke'),
             $content = $item.find('.ocean-item-content'),
             $eyebrow = $item.find('.ocean-eyebrow'),
             $band = $item.find('.ocean-band-band'),
             $wrapper_band = $item.find('.ocean-band'),
             $subnav_col = $item.find('.ocean-subnav-col'),
             $subnav = $item.find('.ocean-item-subnav-container'),
             $bottom_half = $item.find('.bottom-half'),
             $top_half = $item.find('.top-half'),
             $content_wrapper = $top_half.find('[id*="-photo-content"]'),
             $top_middle_column = $content_wrapper.find('.ocean-bigcol'),
             $top_middle_column_pad = $content_wrapper.find('.ocean-bigcol-pad'),
             $top_last_column = $content_wrapper.children().last(),
             $ctas_col = $bottom_half.find('.ocean-ctas-col'),
             $buttons = $item.find('.ibm-btn-row');

        if (browserWidth > 660) {
          $container.addClass('ocean-with-bands');


            $item.css('visibility','hidden');

            var smallest = (center_width / browserHeight < ratio) ? center_width : browserHeight;

            smallest = smallest < minHeight ? minHeight : smallest;

            if (smallest > 1400) {
              smallest = 1400;
            }

            var margin = (smallest/2 * -1);
            var shapeHeight = browserWidth > 759 ? 'auto' : smallest;

            $shapes.css({
              'padding-top':smallest,
              'width':smallest,
              'height':shapeHeight,
              'margin-left':margin
            });

            $center.css({
              width:smallest
            });

            $band.css({
              'height':(smallest/2),
              'top':(smallest/4),
              'display':'block',
              'position':'absolute',
              'width':'100%'
            });

            $item.css('visibility','visible');

            if (browserWidth > 759) {
              $wrapper_band.css({
                'height':smallest,
                'transform':'translate3d(0px, '+(smallest/4)+'px,0px)'
              });
              $content.css({
                'padding-top':((smallest/4) + 50)
              });
              $fill.css({
                'clip':'rect('+smallest/4+'px, ' + smallest + 'px, ' + smallest + 'px, 0)'
              });
              $stroke.css({
                'clip':'rect(0px,' + smallest + 'px, '+smallest/4+'px, 0)'
              });

              $subnav = $subnav.appendTo($top_last_column);
              $buttons = $buttons.appendTo($top_middle_column_pad);

            } else {
              $wrapper_band.css({
                'height':'auto',
                'transform':'none'
              });
              $content.css({
                'padding-top':''
              });
              $fill.css({
                'clip':'auto'
              });
              $stroke.css({
                'clip':'auto'
              });

              $subnav = $subnav.appendTo($subnav_col);
              $buttons = $buttons.appendTo($ctas_col);

            }

            if (browserWidth < 760 && browserWidth > 660) {
              $top_half.css({
                'height':(smallest/2)
              });
              $bottom_half.css({
                'margin-top':((smallest/4) + 50)
              });
            } else {
              $bottom_half.removeAttr('style');
              $top_half.removeAttr('style');
            }

            if (smallest < 1000) {
              $container.removeClass('has-sitenav');

              if (smallest > 759) {
                if (browserWidth <= (smallest * 0.89)) {
                  $top_middle_column.css('padding-left', 20);
                  $eyebrow.css('padding-left', 20);
                } else {
                  $top_middle_column.removeAttr('style');
                  $eyebrow.removeAttr('style');
                }
              }
            } else {
              $container.addClass('has-sitenav');
            }

            if (orientation !== 'ms' && orientation !== 's') {
              $item.css('height', smallest);
            } else {
              $item.css('height', '');
            }

        } else {
          $item.css('height','');
          $shapes.removeAttr('style');
          $content.removeAttr('style');
          $band.removeAttr('style');
          $center.removeAttr('style');
          $subnav.removeAttr('style');
          $fill.removeAttr('style');
          $stroke.removeAttr('style');
          $bottom_half.removeAttr('style');
          $top_half.removeAttr('style');
          $wrapper_band.removeAttr('style');
          $top_middle_column.removeAttr('style');
          $eyebrow.removeAttr('style');
          console.log($subnav);
          $subnav.appendTo($subnav_col);
          $buttons.appendTo($ctas_col);
        }
        $item.css('height');
        //$shapes.css('height');
        //$content.css('height');
        //$band.css('height');
        //$center.css('height');
        //$subnav.css('height');
        //$fill.removeAttr('style');
        //$stroke.removeAttr('style');
        //$bottom_half.removeAttr('style');
        //$top_half.removeAttr('style');
        //$wrapper_band.removeAttr('style');
        //$top_middle_column.removeAttr('style');
        //$eyebrow.removeAttr('style');
      });



      parallax.update(browserResults);
    }

    function initElements() {
      $items = $('.ocean-item');
      $shapes = $items.find('.ocean-shape svg');
      $drawer = $('#ocean-hero-drawer');
      $hero = $('#ocean-hero');
    }

    me.init = function () {
      initElements();
      bind();
      onSizeChange(browser.get());
    };

})(jQuery, IBMCore);




