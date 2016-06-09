// ocean_tracking.js

(function($, IBM) {
    
  var me = IBM.namespace(IBM, "common.widget.ocean_tracking"),
      carousel = IBM.common.widget.ocean_carousel,
      browser = IBM.common.utils.browser,
      parallax = IBM.common.widget.ocean_parallax;
      // IBMCore.common.widget.ocean_tracking.fireMapEvent()



    // function fireLeadForensics() {
    //     var trktit = encodeURIComponent(document.title).substring(0, 200);
    //     trktit = trktit.replace(/\%u00a0/g, '');
    //     trktit = trktit.replace(/\%u2122/g, '');
    //     trktit = trktit.replace(/\%u[0-9][0-9][0-9][0-9]/g, '');
    //     var trklng = window.navigator.userLanguage || window.navigator.language;
    //     var trkguid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    //         var r = Math.random() * 16 | 0,
    //             v = c == 'x' ? r : (r & 0x3 | 0x8);
    //         return v.toString(16);
    //     });
    //     var link = 'http://www.central-core-7.com/Track/Capture.aspx?retType=js&trk_user=54423&trk_sw=' + encodeURIComponent(screen.width).substring(0, 6) + '&trk_sh=' + encodeURIComponent(screen.height).substring(0, 6) + '&trk_ref=' + encodeURIComponent(document.referrer).substring(0, 1100) + '&trk_tit=' + trktit + '&trk_loc=' + encodeURIComponent(document.location).substring(0, 1000) + '&trk_agn=' + encodeURIComponent(navigator.appName).substring(0, 100) + '&trk_agv=' + encodeURIComponent(navigator.userAgent + '.lfcd' + screen.colorDepth + '.lflng' + trklng).substring(0, 1000) + '&trk_dom=' + encodeURIComponent(document.domain).substring(0, 200) + '&trk_guid=' + trkguid + '&trk_cookie=NA';
    //     var j = document.createElement('script');
    //     j.type = 'text/javascript';
    //     j.src = link;
    //     var s = document.getElementsByTagName('script')[0];
    //     s.parentNode.insertBefore(j, s);
    // }

    function fireLeadForensicsHttps() {
        var trktit=encodeURIComponent(document.title).substring(0,200);
        trktit=trktit.replace(/\%u00a0/g,'');
        trktit=trktit.replace(/\%u2122/g,'');
        trktit=trktit.replace(/\%u[0-9][0-9][0-9][0-9]/g,'');
        var trklng=window.navigator.userLanguage||window.navigator.language;
        var trkguid='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){var r=Math.random()*16|0,v=c=='x'?r:(r&0x3|0x8);
            return v.toString(16);
        });
        var link='https://secure.leadforensics.com/Track/Capture.aspx?retType=js&trk_user=54423&trk_sw='+encodeURIComponent(screen.width).substring(0,6)+'&trk_sh='+encodeURIComponent(screen.height).substring(0,6)+'&trk_ref='+encodeURIComponent(document.referrer).substring(0,1100)+'&trk_tit='+trktit+'&trk_loc='+encodeURIComponent(document.location).substring(0,1000)+'&trk_agn='+encodeURIComponent(navigator.appName).substring(0,100)+'&trk_agv='+encodeURIComponent(navigator.userAgent+'.lfcd'+screen.colorDepth+'.lflng'+trklng).substring(0,1000)+'&trk_dom='+encodeURIComponent(document.domain).substring(0,200)+'&trk_guid='+trkguid+'&trk_cookie=NA';
        var j = document.createElement('script');
        j.type = 'text/javascript';
        j.src=link;
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(j, s);

    }

    function fireCarouselEvent(carousel) {
        // console.log("TODO fire carousel track:", carousel);
        var track = {
            ibmEV: digitalData.page.category.primaryCategory || window.location.pathname,
            ibmEvAction: "carousel_change",
            // ibmEvAction: digitalData.page.category.primaryCategory || "carousel_change",
        };

        ibmStats.event(track);
    }
    function fireScrollEvent(scroll, id) {
        // console.log("TODO fire scroll track:", scroll.scrollDirection, scroll.trackId);
        var track = {
            ibmEV: digitalData.page.category.primaryCategory || window.location.pathname,
            ibmEvAction: "homepage_scroll_section",
            ibmEvTarget: scroll.trackId
            // ibmEvAction: digitalData.page.category.primaryCategory || "carousel_change",
        };
        // only track forward events, and the count of those events per session will indicate scroll distance?

        if (scroll.scrollDirection === "FORWARD") {
            // console.log('scroll track go:', track);
            ibmStats.event(track);     
        }

          
    }


    function fireInfrastructureMapEvent(evt) {
        // console.log('go fire map event:', evt); 
        // happens too much from the map thing
    }

    me.fireMapEvent = fireInfrastructureMapEvent;
  $(function() {

    $(window).load(function() {
        // console.log('ocean_tracking load');
        carousel.events.subscribe('carousel:swipe', 'ocean_carousel', fireCarouselEvent);
        carousel.events.subscribe('carousel:click', 'ocean_carousel', fireCarouselEvent);
        // browser.events.subscribe('update:size', 'browser', fireScrollEvent);
        parallax.events.subscribe('scene:end', 'ocean_parallax', fireScrollEvent);
        setTimeout(fireLeadForensicsHttps, 1000); // delay thx
    });
  });

})(jQuery,IBMCore);


/*

ibmStats.event object:

    if (!obj.ibmEV) obj.ibmEV = 'null';
    if (!obj.ibmEvAction) obj.ibmEvAction = 'null';
    if (!obj.ibmEvGroup) obj.ibmEvGroup = 'null';
    if (!obj.ibmEvName) obj.ibmEvName = 'null';
    if (!obj.ibmEvModule) obj.ibmEvModule = 'null';
    if (!obj.ibmEvSection) obj.ibmEvSection = 'null';
    if (!obj.ibmEvTarget) obj.ibmEvTarget = 'null';
    if (!obj.ibmEvFileSize) obj.ibmEvFileSize = 'null';
    if (!obj.ibmEvLinkTitle) obj.ibmEvLinkTitle = 'null';
    if (!obj.ibmEvVidStatus) obj.ibmEvVidStatus = 'null';
    if (!obj.ibmEvVidTimeStamp) obj.ibmEvVidTimeStamp = 'null';
    if (!obj.ibmEvVidLength) obj.ibmEvVidLength = 'null';


all pages:

carousels - how many did they flip through?


homepage:

how far did they scroll?


infrastructure:

did they look up a data center on the map? which one?


services:

did they expand a service category to look at details?


built on cloud:

did they swap a video use the switcher?


<script type="text/javascript" src="https://secure.leadforensics.com/js/54423.js" ></script> <noscript><img src="https://secure.leadforensics.com/54423.png" style="display:none;" /></noscript>


*/


