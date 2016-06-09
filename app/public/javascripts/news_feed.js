// news_feed.js

// front-end (boo) implementation of news feed from new.thoughtsoncloud.com

// http://new.thoughtsoncloud.com/feed/json

jQuery(function($) {
    $(window).load(function() {

        // permalink, date, title, thumbnail
        var template = '<div class="ibm-col-4-1 ocean-news-item {{#categories}}news-cat-{{.}} {{/categories}}{{^thumbnail}}ocean-news-item-bg{{/thumbnail}}"><a target="_blank" href="{{permalink}}">{{#thumbnail}}<img src="{{.}}" class="ocean-news-item-image">{{/thumbnail}}<p class="ocean-news-item-date">{{date}}</p><p class="ocean-h2">{{title}}</p></a><div class="ocean-news-item-category-container">{{#categories}}<a class="ocean-news-item-category-link">{{.}}</a>{{/categories}}</div></div>';
        var errorTemplate = '<div class="ocean-news-item"><p class="ocean-h2">{{message}}</p></div>';
        var catTemplate = '<a class="ocean-news-category-menu ocean-h2 ocean-fg-grey_100">{{.}}</a>'; // a.band-title.ocean-fg-grey_100
        var newsContainer = $('.ocean-news-container');
        // var colorClass = newsContainer.data('color') || "red_60";
        var colorClass = "red_60";
        colorClass = "ocean-fg-" + colorClass;
        // console.log('newsfeed color:', colorClass);
        var bgColorClass = newsContainer.data('bgcolor') || "grey_80";
        bgColorClass = "ocean-bg-footer"; // CHANGE ALL TO SAME OVERRIDE // "ocean-bg-" + bgColorClass;
        // console.log('newsfeed color:', bgColorClass);
        // MAYBE share link back in 
        // TODO format date only not time - MM.DD.YYYY 

        // BACK UP BACK UP
        var wpPath;

        // temp hack to use cached fees while we get a cert on the server
        // wpPath = "http://new.thoughtsoncloud.com/wp-content/uploads/2015/09/";
        // var ourPath = "//www.ibm.com/cloud-computing/bin/js";
        // var fetchPath = "//www.ibm.com/cloud-computing/bin/js/"; // + section + ".json" // ALSO could prefix our bluemix instance for temporary-ness
        // var imageBackPath = "//www.ibm.com/cloud-computing/images/cloud/";

        // http://www.ibm.com/cloud-computing/bin/js for json
        // http://www.ibm.com/cloud-computing/images/cloud for images
        
        
        // ocean 
        // var fetchPath = "//ocean-review.mybluemix.net/images/newsfeed/"; // + section + ".json" // ALSO could prefix our bluemix instance for temporary-ness
        // var imageBackPath = fetchPath; //"//www.ibm.com/cloud-computing/images/cloud/";

        // TODO page-specific category classes
        var masterCategories = "Insights,Developer,News,Infrastructure,Platform,Solutions,Services,Built on Cloud".split(',');
        var slug = newsContainer.data('feed') || undefined; // category slugs: built-on-cloud developer infrastructure insights news platform services solutions thoughtsoncloud
        // TODO color background different page to page IF NO THUMBNAIL

        function initGrid() {
            newsContainer.responsive_grid({
                padding_x: 24,
                padding_y: 24,
                no_columns: 3,
                margin_bottom: 50,
                single_column_breakpoint: 700
            });
        }
        function onFail() {
            newsContainer.html("");
            newsContainer.append('<div class="ocean-news-item"><p class="ocean-h2">Sorry, news could not be fetched at this time.</p></div>');
        }
        var lastFilter;

        function filterCategory(evt) {
            // news-cat-{{.}} hide/show
            evt.preventDefault();
            var allItems = $('.ocean-news-item');
            var clicked = $(this);
            var cat = clicked.html();

            if (lastFilter) {
                lastFilter.removeClass('selected');
                if ((lastFilter.html() === cat) || clicked.hasClass('ocean-news-category-all')) {

                    allItems.show();

                    initGrid();
                    lastFilter = null;
                    return;    
                }
                
            }
            // forcibly clear all inline styles applied by responsive grid
            allItems.each(function(){ $(this)[0].style.cssText = "display: none;";});
            // allItems.hide(); 

            lastFilter = clicked.addClass('selected');
            
            var showCategory = $('.news-cat-' + cat).show();
            initGrid();
        }
        var defaultFeed = "//new.thoughtsoncloud.com/feed/json";

        var maxItems = 20;
        if (slug) {
            maxItems = 6;
            defaultFeed = "//new.thoughtsoncloud.com/category/" + slug + "/feed/json";
        }
        // 

        // defaultFeed = fetchPath + "all.json";
        // if (slug) {
        //     defaultFeed = fetchPath + slug + ".json";
        // }
        // TEMP TEMP
        

        var categoryList = [];
        if (newsContainer.length > 0) {
            // newsContainer.append('<div class="ibm-spinner"></div>');
            $.get(defaultFeed)
                .done(function(data) {
                    if (!Mustache) {
                        // error our other js didnt load lets fail
                        onFail();
                        return;
                    }
                    newsContainer.html("");
                    for (var d in data) {
                        // console.log(d);
                        if (d > maxItems - 1) continue;
                        var append = true;
                        var dateObj = new Date(data[d].date.split(' ')[0]); // split space gets just day month year and ignores time, and fixes firefox parse bug which displayed NaNs
                        var dateStr = (dateObj.getMonth() + 1) + '.' + dateObj.getDate() + '.' +  dateObj.getFullYear();
                        // console.log('hey date:', dateStr);
                        data[d].date = dateStr;
                        if (data[d].tags) {
                            // tags 'pinned' then prepend to top
                            for (var tag in data[d].tags) {
                                if (data[d].tags[tag] === 'pinned') append = false;
                            }
                        }
                        
                        if (data[d].thumbnail) {
                            // strip http: so no cert warning inbrowser
                            data[d].thumbnail = data[d].thumbnail.replace("http:", "");
                        }
                        if (append) {
                            newsContainer.append(Mustache.render(template, data[d]));    
                        } else {
                            newsContainer.prepend(Mustache.render(template, data[d]));    
                        }
                        
                        for (var c in data[d].categories) {
                            var cat = data[d].categories[c];
                            if (categoryList.indexOf(cat) === -1) categoryList.push(cat);
                        }
                    }
                    $(".ocean-news-item-category-link").addClass(colorClass);
                    $(".ocean-news-item-bg").addClass(bgColorClass);
                    // $(".ocean-news-item-bg " + "." + colorClass).removeClass(colorClass); // remove for bg ones too little contrast
                    // trigger responsive grid 
                    // (data-widget="responsive_grid")
                    imagesLoaded( newsContainer, initGrid );
                    // initGrid();

                    var categoryContainer = $('.ocean-news-category-container');
                    if (categoryContainer.length > 0) {
                        for (var i in masterCategories) {
                            var catName = masterCategories[i];
                            if (categoryList.indexOf(catName) > -1) categoryContainer.append(Mustache.render(catTemplate, catName));
                            if (catName === 'News') categoryContainer.append("<br>"); // duh
                            
                        }
                        
                        $('.ocean-news-category-menu').click(filterCategory);
                        $('.ocean-news-category-all').click(filterCategory);
                    }
                })
                .fail(onFail);
        }
  });
});