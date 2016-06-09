/**

    RSS feed display widget.
    <br />
    <br />Gets a RSS feed and generates a link list using the items from the RSS feed.
    <br />
    <br />Usage:
        
    <div data-widget="rssdisplaycards" data-feedurl="http://someURL.com/to/rss/feed/"></div>

    __Special case:__ In scenarios where you dynamically inject HTML post page load, you can initialize the widget on your injected container like this:
    
    $("yourRssdisplayContainer").rssdisplay();

    Allowed options and values. __All values are strings__ (html standards):
    <br />__data-widget__: rssdisplay
    <br />__data-feedurl__: http://somefeed/url/here 
    <br />__data-externalicon__: true | false (default)  &nbsp; // Shows the external icon instead of default arrow
    <br />__data-newwindow__: true | false (default)  &nbsp; // Opens all links in new window/tab
        
    @class IBMCore.common.widget.rssdisplay

**/

(function ($, IBM) {

    var me = IBM.namespace(IBM, "common.widget.rssdisplaycards"),
        rssdisplays = [],
        object_name = "RSS display widget - cards variant";

    /**
        Public jQuery plug-in definition.
        <br />Used by core v18 JS file to auto-init HTML that exist on the page on DOM ready.
        <br />If you are dynamically injecting and initing the widget HTML post-load, call this plug-in on your injected container.

        @method $.fn.rssdisplay
        @param [settings] {Object} Settings to override defaults and element's @data-xxxx attributes.
    **/
    $.fn.rssdisplaycards = function (settings) {
        return this.each(function () {
            var d = createRssdisplayWidget(settings);
            d.init($(this));
        });
    };

    /**
        Called by our jQuery plug-in.
        <br />This creates a new rssdisplay object and registers the instance into array of all this widget instances.
        <br />The jQuery plugin abstracts this and makes behind-the-scenes changes easy.
        
        @method createRssdisplayWidget
        @private
        @param [settings] {Object} Settings to override defaults and element's @data-xxxx attributes.
        @return {Object} The rssdisplayWidget object instance created.
    **/
    function createRssdisplayWidget (settings) {
        var widget = new rssdisplayWidget(settings);
        
        rssdisplays.push(widget);
        
        return widget;
    }
    
    /**
        rssdisplayWidget object/constructor for our public jQuery plugin.
        <br />Called by "createRssdisplayWidget".
        <br />You can't use this directly. Use the standard $(xxxx).rssdisplay() plug-in method to initialize the widget.

        @method rssdisplayWidget
        @constructor
        @private
        @param [settings] {Object} Settings to override defaults and element's @data-xxxx attributes.
    **/
    function rssdisplayWidget (settings) {
        var me = this,
            $container,
            config = {},
            defaults = {
                feedurl: "",
                newwindow: false,
                externalicon: false
            };
            
        /**
            This is a method of the "rssdisplayWidget" constructor.
            <br />Called by our public jQuery plug-in after a new rssdisplayWidget object has been created and returned by "createRssdisplayWidget".
            <br />Automatically inits the rssdisplayWidget plug-in on the passed element, merging in any manually passed settings, 
             @data-xxxxx settings, and our default settings. 
            
            @method init
            @param $elem {jQuery selector} The element you want to turn into a widget.
        **/
        me.init = init;
        function init ($elem) {
            var randomCallbackName = "dynCallback" + Math.floor((Math.random() * 999999) + 1);

            // If we're here, it means it's enabled, so build it/do your thing. 
            // Binds widget object to the DOM element it was init on by jQuery plugin method.
            // Keep "instance" as-is; ALL element-bound widgets will use this data attribute.
            $elem.data("widget", me);

            $container = $elem;

            // Merge in configuration to use, then init plug-in with them:  JS settings override HTML which override defaults.
            $.extend(config, defaults, $container.data() || {}, settings);

            // Error handling.
            if (config.feedurl === "") {
                console.error("RSS display widget is missing required feedurl parameter.");
            }

            // SWWIF uses unconventional callback param setup, so we have to mimic what jQuery does natively.
            // Dyn. create global function for callback, mapped to this object.
            window[randomCallbackName] = function (data) {
                serviceCallback(data);
            };

            // Fire WSR for feed items, using random callback name above mapped to our private function.
            IBM.common.util.coreservices.makeRequest("200", randomCallbackName, {
                type: "getBlogs",
                blogUrl: config.feedurl
            });

        }
        
        /**
            This is a method of the "rssdisplayWidget" constructor.
            <br />This is the callback for the service request to get the feed data, mapped to randomized global function name.
            <br />This loops thru the WSR data, creates the actual widget HTML, and echoes it on the glass into the container.
            
            @method serviceCallback
            @private
            @param data {Object} The data JSON object returned from the SWWIF service call.
        **/
        function serviceCallback (data) {
            var html = "",
                iconClass = config.externalicon === true ? "ibm-external-link" : "ibm-forward-link" ,
                newWin = config.newwindow === true ? ' target="_blank"' : '' ;
            
            // Safety in case the service throws a 500 or can't get the feed URL and returns no data.
            if (!data || !data.blogEntries || data.blogEntries.length === 0) {
                console.warn("The service was unable to return data for the RSS url: " + config.feedurl, " It returned: ",data);
                return;
            }
            // "I just published a post on Watson Trend, a new App that shows what’s trending and relevant. I’d love to hear what you THINK!!! http//insights-on-business.com/consumer-products/watsontrend Read my blogs on LinkedIn at or visit me at https//www.linkedin.com/today/author/6343514 OR visit me at Continue reading "
            
            // Loop thru the returned data items, creating a link list HTML 
            $.each(data.blogEntries, function () {
                console.log('blog entry data:', this);
                this.summary = this.summary.replace('Continue reading', '');
                this.summary = this.summary.split('http')[0];
                // html += '<li><a class="' + iconClass + '" href="' + this.link + '"'+ newWin + '>' + this.title + '</a></li>';
                html += Mustache.render('<a href="{{link}}" target="_blank" class="card bordered"><div class="content"><p class="posting-date">{{published}}</p><h3>{{title}}</h3><p>{{summary}}</p></div><div class="links"><span target="_blank" class="read-more"><i class="icon-circ-arrow-right link-icon"></i>Read more</span></div></a>', this);
            });

            // html = '<ul class="ibm-link-list">' + html + '</ul>';

            // DEBUGGING ONLY. Comment out for production use:
            //console.log("Creating a widget here:", $container, " config: ", config, " using this data: ", data);

            // Echo the widget's HTML into the widget's container.
            // $container.html(html);

            $container.addClass("card-container masonry").html(html);
        }
        /* 

        
        */


        // END rssdisplaywidget object constructor
    }
    
})(jQuery, IBMCore);

