
/**
    
    Video jukebox control for project ocean

    @class IBMCore.common.widget.video_switcher

**/

(function($, IBM) {

    var me = IBM.namespace(IBM, "common.widget.video_switcher"),
        browser = IBM.common.utils.browser;


    function swapVideo(evt) {
      // according to clicked element do some stuff
      var clicked = $(this);
      // pull data - data-videoid="s1kxjXVZ3kc", data-target="#section-video-container"
      var target = clicked.data('target');
      var videoId = clicked.data('videoid');
      var titleEl = clicked.data('title-element');
      if (!target) return console.warn('No data-target on video_switcher widget definition:', clicked);
      if (!videoId) return console.warn('No data-videoid on video_switcher widget definition:', clicked);
      // IBM.common.widget.videoplayer.youtube
      
      $('.now-playing').removeClass('now-playing');

      $(target).videoplayer({
        videotype: "youtube",
        videoid: videoId,
        showvideotitle: false
      });

      $(target).find('.ibm-video-placeholder').trigger('click'); // kind of fake autoplay

      clicked.addClass('now-playing');
    }


    me.init = function ($elements) {
      // console.log('hello video_switcher', $elements);
      $elements.click(swapVideo);
    };

})(jQuery, IBMCore);




