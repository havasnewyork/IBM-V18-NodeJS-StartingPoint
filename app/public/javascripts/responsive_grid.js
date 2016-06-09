/**
    @class IBMCore.common.widget.responsive_grid

**/

(function($, IBM) {

    var me = IBM.namespace(IBM, "common.widget.responsive_grid");
    // $('.ocean-fpo-news-container').responsive_grid({
    //   no_columns: 3,
    //   padding_x: 24,
    //   padding_y: 60,
    //   margin_bottom: 50,
    //   single_column_breakpoint: 700
    // });

    var pluginName = 'responsive_grid',
        defaults = {
            padding_x: 24,
            padding_y: 60,
            no_columns: 3,
            margin_bottom: 50,
            single_column_breakpoint: 700
        },
        columns,
        $article,
        article_width;

    // me.init = function($elem) {

    //     // console.log('responsive_grid init go:', $elem);
    //     this.instance = new Plugin($elem, defaults);
    // }

    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype.init = function () {

        var self = this,
            resize_finish;

        // todo use browser resize event
        IBM.common.utils.browser.events.subscribe('update:size', 'browser', function() {
            clearTimeout(resize_finish);
            resize_finish = setTimeout( function () {
                self.make_layout_change(self);
            }, 11);
        });

        self.make_layout_change(self);

        setTimeout(function() {
            $(window).resize();
        }, 500);
    };

    Plugin.prototype.calculate = function (single_column_mode) {

        var self = this,
            tallest = 0,
            row = 0,
            $container = $(this.element),
            container_width = $container.width();
            $article = $(this.element).children();
            $article = $article.filter(function(ele){ return $(this).is(":visible"); });

        if(single_column_mode === true) {
            article_width = $container.width() - self.options.padding_x;
        } else {
            article_width = ($container.width() - self.options.padding_x * self.options.no_columns) / self.options.no_columns;
        }
        // console.log('grid item len:', $article.length);
        $article.each(function() {
            $(this).css('width', article_width);
        });



        columns = self.options.no_columns;

        $article.each(function(index) {
            var current_column,
                left_out = 0,
                top = 0,
                $this = $(this),
                prevAll = $this.prevAll(), // again filter visible :(
                tallest = 0;

            prevAll = prevAll.filter(function(ele){ return $(this).is(":visible"); });

            if(single_column_mode === false) {
                current_column = (index % columns);
            } else {
                current_column = 0;
            }

            for(var t = 0; t < columns; t++) {
                $this.removeClass('c'+t);
            }

            if(index % columns === 0) {
                row++;
            }

            $this.addClass('c' + current_column);
            $this.addClass('r' + row);

            prevAll.each(function(index) {
                if($(this).hasClass('c' + current_column)) {
                    top += $(this).outerHeight() + self.options.padding_y;
                }
            });

            if(single_column_mode === true) {
                left_out = 0;
            } else {
                left_out = (index % columns) * (article_width + self.options.padding_x);
            }

            $this.css({
                'position': 'absolute',
                'left': left_out,
                'top' : top
            });
        });

        this.tallest($container);
        // $(window).resize(); // removed for performance - this was calling the method repeatedly when no resize occurs.
    };

    Plugin.prototype.tallest = function (_container) {
        var column_heights = [],
            largest = 0;

        for(var z = 0; z < columns; z++) {
            var temp_height = 0;
            _container.find('.c'+z).each(function() {
                temp_height += $(this).outerHeight();
            });
            column_heights[z] = temp_height;
        }

        largest = Math.max.apply(Math, column_heights);
        _container.css('height', largest + (this.options.padding_y + this.options.margin_bottom));
    };

    Plugin.prototype.make_layout_change = function (_self) {
        if($(window).width() < _self.options.single_column_breakpoint) {
            _self.calculate(true);
        } else {
            _self.calculate(false);
        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            // console.log('init responsive_grid:', this);
            // if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new Plugin(this, options));
            // }
        });
    }


    // var $subnav_lis = null
    // var $items = null;
    // var doScroll = true;
    // var inMotion = false;

    // me.init = function() {
    //   // return;
    //   $subnav_lis = $('.ocean-subnav li');
    //   $items = $('.ocean-item');
    //   bind();
    //   IBM.common.utils.browser.checkHash();
    // };

    // function bind() {
    //   $('body').on('click', 'a[href^="#"]', onLinkClick);
    //   IBM.common.utils.browser.events.subscribe('update:scroll', 'browser', onScroll);
    //   IBM.common.utils.browser.events.subscribe('update:hash', 'browser', onHashUpdate);
    // }

    // function onLinkClick(e) {
    //   e.preventDefault();
    //   var $this = $(this);
    //   var href = $this.attr('href');
    //   href = href === '#' ? '/' : href;
    //   updateHash(href);
    // }

    // function onScroll(results) {
    //   if (inMotion) return;

    //   var $current = $items[0];
    //   $items.each(function() {
    //     var $this = $(this),
    //         t = $this.offset().top;

    //     if (t < results.scrollTop) {
    //       $current = $this;
    //     }

    //   });
      
    //   var href = $($current).attr('id').replace('ocean-item-', '');
    //   href = href === 'blue' ? '' : ('#'+href);

    //   updateHash(href, false);
    // }

    // function onHashUpdate(results) {
    //   if (doScroll) {
    //     var $to = $('#'+results.hashParams);
    //     inMotion = true;
    //     IBM.common.utils.browser.scrollTo($to, function() {
    //       inMotion = false;
    //     });
    //   }
    // }

    // function updateHash(href, scroll) {
    //   doScroll = typeof scroll !== 'undefined' ? scroll : true;
    //   history.pushState({}, '', href);

    //   $subnav_lis.removeClass('ocean-selected');
    //   if (href !== '/') {
    //     $('.sitenav-'+href.replace('#','')).addClass('ocean-selected');
    //     IBM.common.utils.browser.checkHash();
    //   } else {
    //     $('.sitenav-blue').addClass('ocean-selected');
    //     if (doScroll) {
    //       inMotion = true;
    //       IBM.common.utils.browser.scrollTo($('body'), function() {
    //         inMotion = false;
    //       });
    //     }
    //   }
    // }


})(jQuery, IBMCore);


