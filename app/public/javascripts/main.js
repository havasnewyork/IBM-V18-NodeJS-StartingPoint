(function($, IBM) {
    $(function() {
		  // If widgets are enabled (default) run this group which auto-inits them all.
		  if (IBM.common.util.config.get("contentwidgets.enabled") === true) {

		        if (IBM.common.util.ocean_images_manager) {
		        	IBM.common.util.ocean_images_manager.init();
		        }

            if (IBM.common.widget.ocean_sitenav) {
                IBM.common.widget.ocean_sitenav.init();
            }

            // TODO only on home page please does not need to fire elsewhere
	        if (IBM.common.widget.ocean_parallax) {
	        	IBM.common.widget.ocean_parallax.init($('#ocean-parallax-container'));
	        }

            if (IBM.common.widget.ocean_animations) {
                IBM.common.widget.ocean_animations.init();
            }
            
            if (IBM.common.widget.responsive_homepage) {
                IBM.common.widget.responsive_homepage.init();
            }


		    if (IBM.common.widget.responsive_grid) {
		    	// IBM.common.widget.responsive_grid.init();
                $("div[data-widget=responsive_grid]:not([data-init=false])").responsive_grid({
                    no_columns: 3,
                    padding_x: 24,
                    padding_y: 60,
                    margin_bottom: 50,
                    single_column_breakpoint: 700
                  });
            }
            
            if (IBM.common.widget.showhide_grid) {
                IBM.common.widget.showhide_grid.init($("[data-widget=showhide_grid]:not([data-init=false])"));
            }
            if (IBM.common.widget.video_switcher) {
                IBM.common.widget.video_switcher.init($("[data-widget=video_switcher]:not([data-init=false])"));
            }
            // viewport debugger borrowed from nsdev...

            // var debugViewport = function(){
            //     var viewportWidth = $(window).width() + IBMCore.common.util.getScrollbarWidth();
            //     var viewportHeight = $(window).height();
            //     // console.log('update size:', viewportWidth);
            //     $("#vpsize").html(viewportWidth + " x " + viewportHeight + "<span> : CSS Viewport</span><br />" + jQuery("#ibm-content-body .ibm-columns:first").width() + "<span> : Grid used</span>");
            // }
            // debugViewport();
            // IBM.common.utils.browser.events.subscribe('update:size', 'browser', debugViewport);
            

            // (function($) {
            //     $(function() {
                /* ocean-chat-cta link action - courtesy of
                jaroslav.maslo@sk.ibm.com - Jaroslav Maslo/Slovakia/IBM
                Corporate Webmaster - JS Developer
                */
            $('.ocean-chat-cta').click(function(evt) {
                evt.preventDefault();
                // console.log('chat cta click');
                if ($('#lpbutton')[0] && $('#lpbutton').css('visibility') === 'visible' && $('#lpbutton a.ibm-chat-link')[0]) {
                    $('#lpbutton a.ibm-chat-link').click();
                } else {
                    IBMCore.common.widget.overlay.show('contact-overlay');
                    $("#contact-overlay-details").html($('.ibm-live-assistance-list').html());
                    $("#contact-overlay-details").find(".ibm-email-link, .ibm-phone-link").addClass('ocean-h2');
                    // $('.ibm-contact-widget-btn').eq(0).click();
                }
            });
            //     });
            // })(jQuery);  
          }
    });
})(jQuery, IBMCore);



