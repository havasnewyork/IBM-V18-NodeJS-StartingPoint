// affix.js

/**
    
    Fixed positioning widget. 
    
        <div class="ibm-band" data-widget="affix" style="background-image: url(//some/URL/to/your/image.file);">
    
    <br >__NOTE:__ Make sure you only set the @background-image property (don't set @background) else it won't properly.

    @class IBMCore.common.widget.parallaxscroll

**/

(function($, IBM) {

    var me = IBM.namespace(IBM, "common.widget.affix");

    // adds and removes .affix class which manages position-fixed. Copied shamelessly in concept from https://github.com/twbs/bootstrap/blob/master/js/affix.js

    /**
        Inits the parallax scroll widget on the passed element.
        <br />This is automatically called onload by the v18 JS for each element that has the data-widget attribute and is not disabled.
        <br />If you are dynamically injecting a div.ibm-band HTML, call this function after DOM injection, passing your .ibm-band element to it.

        @method init
        @param {DOM element} el The &lt;div>.ibm-band element you want to enable parallax scrolling on.
    **/



   

    me.init = function (el) {
        var $el = $(el),
            $window = $(window)
            offsetTop = $el.data('offset-top') || 0,
            offsetBottom = $el.data('offset-bottom') || 0;
        

        // Add class that sets the proper styles.
        // $el.addClass("ibm-parallax-scroll");


        function checkPosition () {
            if (!$el.is(':visible')) return;
            
            var height = $el.height(),
                // offset = options.offset
                scrollHeight = Math.max($(document).height(), $(document.body).height()),

            // position y of target compared to our scroll position

                scrollTop    = $el.scrollTop(),
                position     = $el.offset(),
                targetHeight = $el.height();

            console.log($el, height, scrollTop, position, targetHeight);

            $el.removeClass('affix-top affix-bottom affix');
            if (scrollTop <= offsetTop) {
                // top position
                $el.addClass('affix-top');
            } else if (position.top + height >= scrollHeight - offsetBottom) {
                // bottom position
                $el.addClass('affix-bottom');
            } else {
                // centered affixed position
                $el.addClass('affix');
            }

        }

        // Bind the background to shift whenever the page scrolls.
        $(window).scroll(checkPosition);

        // Adjust image onload.
        $(function(){
            checkPosition();
        });


    };

})(jQuery, IBMCore);

