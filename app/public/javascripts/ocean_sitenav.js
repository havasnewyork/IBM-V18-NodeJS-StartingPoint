/**
 *
	@class IBMCore.common.widget.ocean-sitenav

**/

(function($, IBM) {

    var me = IBM.namespace(IBM, "common.widget.ocean_sitenav");
    var $subnav_lis = null;
    var $items = null;
    var doScroll = true;
    var inMotion = false;


    function bind() {
      $('body').on('click', '.ocean-item-sitenav-container a', onLinkClick);
      //IBM.common.utils.browser.events.subscribe('update:scroll', 'browser', onScroll);
      IBM.common.utils.browser.events.subscribe('update:hash', 'browser', onHashUpdate);
    }

    function onLinkClick(e) {
      e.preventDefault();
      var $this = $(this);
      var href = $this.attr('href');
      href = href === '#' ? '/' : href;
      updateHash(href);
      me.events.publish('sitenav:click', href);
    }

    function onScroll(results) {
      if (inMotion) return;

      var $current = $items[0];
      $items.each(function() {
        var $this = $(this),
            t = $this.offset().top;

        if (t < results.scrollTop) {
          $current = $this;
        }

      });
      
      var href = $($current).attr('id').replace('ocean-item-', '');
      href = href === 'blue' ? '' : ('#'+href);

      updateHash(href, false);
    }

    function onHashUpdate(results) {
      // console.log('hash updated:', doScroll, results);
      //if (doScroll) {
      //  var $to = $('#'+results.hashParams);
      //  inMotion = true;
      //  IBM.common.utils.browser.scrollTo($to, function() {
      //    inMotion = false;
      //  });
      //}
    }

    function updateHash(href, scroll) {
      doScroll = typeof scroll !== 'undefined' ? scroll : true;
      history.pushState({}, '', href);

      //$subnav_lis.removeClass('ocean-selected');
      //if (href !== '/') {
      //  $('.sitenav-'+href.replace('#','')).addClass('ocean-selected');
      //  IBM.common.utils.browser.checkHash();
      //} else {
      //  $('.sitenav-blue').addClass('ocean-selected');
      //  if (doScroll) {
      //    inMotion = true;
      //    IBM.common.utils.browser.scrollTo($('body'), function() {
      //      inMotion = false;
      //    });
      //  }
      //}
    }

    me.init = function() {
      $subnav_lis = $('.ocean-subnav li');
      $items = $('.ocean-item');
      IBM.common.utils.browser.checkHash();
      bind();
    };

    me.events = IBMCore.common.util.eventCoordinator(me, 'ocean_sitenav', [
      'sitenav:click'
    ]);

})(jQuery, IBMCore);


