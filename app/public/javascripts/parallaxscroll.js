/**
    
    Parallax scrolling widget. 
    <br />
    <br />It's not magic. It simply moves the background up or down as a % of the page's scroll. 
    <br />__NOTE: __This can only be used on bands sections.  (div.ibm-band full-width sections)
    <br />To implement, simply add the attribute to the .ibm-band container:  data-widget="parallaxscroll", shown below.
    <br />Requirement: Obvious, but: You need a big background image for this to work.
    <br />
    <br />Usage:

        <div class="ibm-band" data-widget="parallaxscroll" style="background-image: url(//some/URL/to/your/image.file);">
    
    <br >__NOTE:__ Make sure you only set the @background-image property (don't set @background) else it won't properly.

    @class IBMCore.common.widget.parallaxscroll

**/

(function($, IBM) {

    var me = IBM.namespace(IBM, "common.widget.parallaxscroll");

    // Adds a class to the band element that sets the background image to the proper style to enable BG moving:
    // 50% 100px no-repeat fixed; background-size:cover;

    /**
        Inits the parallax scroll widget on the passed element.
        <br />This is automatically called onload by the v18 JS for each element that has the data-widget attribute and is not disabled.
        <br />If you are dynamically injecting a div.ibm-band HTML, call this function after DOM injection, passing your .ibm-band element to it.

        @method init
        @param {DOM element} el The &lt;div>.ibm-band element you want to enable parallax scrolling on.
    **/

    // support styles of parallax - default is backgroundX

    me.modes = {
        "background": {
            property: "backgroundPosition",
            setProp: "background-position", // de-camelcase instead later...
            parseProp: function(cssString) {
                return cssString.split(" ");
            },
            math: function(p, property) {
                // property[0] used to be backgroundX
                p += me.offsetY;
                return property[0] + " " + -p + "px";
            }
        },
        "backgroundLimit": {
            property: "backgroundPosition",
            setProp: "background-position", // de-camelcase instead later...
            parseProp: function(cssString) {
                return cssString.split(" ");
            },
            math: function(p, property) {
                // property[0] used to be backgroundX
                
                // if (p < 0) p === 0; // limit
                console.log('math:', property, p);
                p += me.offsetY;
                return property[0] + " " + -p + "px";
            }
        },
        "cropReveal": {
            property: "clip",
            setProp: "clip", // de-camelcase instead later...
            parseProp: function(cssString) {
                return cssString.split(" ");
            },
            math: function(p, property) {
                // TRBL on property[]
                // return "rect(" + p + "px " + 
                    
                var top = property[0].replace('rect(', '');
                // console.log(p, top);
                return [
                    "rect(",
                        (parseInt(top, 10) - p) + "px",
                        property[1],
                        property[2],
                        property[3],
                    // ")" // closing paren still exists because parseProp doesnt care yet
                ].join(' ');
            }
        }
    }

    function getInitialModeProperty(mode, $el) {

        var baseProp = $el.css(me.modes[mode].property);
        return me.modes[mode].parseProp(baseProp);
    }

    me.init = function (el) {
        var $el = $(el),
            $window = $(window),
            scrollspeed = $el.data("scrollspeed") || 6,
             // support different modes of parallax styling
            mode = $el.data("parallax-mode") || "background",
            // lets say your target element is fixed but you want calculations from another element that is free-scrolling
            $measureFrom = $($el.attr("data-parallax-trigger") || $el), 
            // fiddly magic number 'data-parallax-offset'

            // capture initial property state
            initialProp = getInitialModeProperty(mode, $el);
            // backgroundX = $el.css("backgroundPosition").split(" ")[0];
        
        me.offsetY = $el.data('parallax-offset') || 0;
        console.log('measuring from:', $el.data("measurefrom"), $measureFrom);
        console.log('parallax mode:', mode);

        // Add class that sets the proper styles.
        $el.addClass("ibm-parallax-scroll");

        function getPrlxValue() {
            return Math.floor((
                Math.floor($window.scrollTop()) - Math.floor($measureFrom.offset().top)
            ) / scrollspeed)
        }

        function adjustImage () {
            // backgroundX + " " + -getPrlxValue() + "px";
            // console.log('adjustImage:', me.modes[mode], getPrlxValue(), initialProp);
            var newValue = me.modes[mode].math(getPrlxValue(), initialProp);
            // console.log(newValue);
            $el.css(me.modes[mode].setProp, newValue);
        }

        // Bind the background to shift whenever the page scrolls.
        $(window).scroll(adjustImage);

        // Adjust image onload.
        $(function(){
            adjustImage();
        });


    };

})(jQuery, IBMCore);

