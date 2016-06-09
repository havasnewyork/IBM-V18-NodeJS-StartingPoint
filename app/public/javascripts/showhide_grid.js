/**
    @class IBMCore.common.widget.responsive_grid

**/

(function($, IBM) {

    var me = IBM.namespace(IBM, "common.widget.showhide_grid");

    function expandServiceItem(evt){
      evt.preventDefault();

      var clicked = this;
      var $clickedGridItem = $(this);
      var $gridItems = $clickedGridItem.parent().find('> .ocean-section-grid-item');
      // console.log('expandclickedGridItem:', $gridItems);

      // manage target element insertion in correct index to preserve design intent
      // if lefts are all the same we are in single column mode
      // find where we need to be
      var offsets = []; 
      var colInsert = 0;
      var lastLeft = 0; // increment for each different value of offset.left
      var lefts = [];
      var clickedPos; // what index position is the one we have clicked?

      // what row is clicked one in?
      var clickedRow;
      // what is our row width?
      var rowWidth;

      $gridItems.each(function(i, item){

        offsets[i] = $(item).offset();
        if (lefts.indexOf(offsets[i].left) === -1) lefts.push(offsets[i].left);
        // console.log(offsets[i]);
        if (item === clicked) {
          // console.log('iterate found our clicked one');
          clickedPos = i;
          clickedLeft = offsets[i].left;
        }
      
      });


      var rowWidth = lefts.length; 

      clickedRow = Math.floor(clickedPos / rowWidth);
      var colInsert = (clickedRow + 1) * (rowWidth);
      colInsert--; // back to array index
      // console.log('pos, row, row width, insert:', clickedPos, clickedRow, rowWidth, colInsert);
      // var $clickedGridItem = jQuery(element);
      var $target = $clickedGridItem.data('target'); // jQuery("#" + $clickedGridItem.attr("id") + "-items"); // or data-target
      $target = $target ? $($target) : $("#" + $clickedGridItem.attr("id") + "-items")
      // var $clickedGridItemHeader = jQuery("h3", $clickedGridItem);

      // figure out if we need to splice into position based on responsive grid...


      // reset all - accordian style
      $(".ocean-section-grid-row.expanded").removeClass('expanded').slideUp(); //.hide();
      

      var isExpanded = $clickedGridItem.hasClass("expanded") || false;
      $(".ocean-section-grid-item.expanded").removeClass('expanded');
      if (isExpanded) {
        // $clickedGridItemHeader.addClass("ocean-fg-teal_60");
        $clickedGridItem.removeClass("expanded");
        $target.slideUp(); // .hide();
      }
      else{
        // if ($expendedtarget){
          // $expendedclickedGridItemHeader.addClass("ocean-fg-teal_60");
          // $expendedclickedGridItem.removeClass("expanded");
          // $expendedtarget.hide();
        // }
        // $clickedGridItemHeader.removeClass("ocean-fg-teal_60");
        $clickedGridItem.addClass("expanded");
        $target.addClass("expanded").addClass("grid-pos-" + (clickedPos % rowWidth)).slideDown(); // correct arrow pointer

        $target.insertAfter($gridItems.eq(colInsert));
      }

      jQuery(".services-section").setsameheight();

    }

    function closetarget(evt) {
      evt.preventDefault();
      // all expanded 
      // var closeParent = $(this).parent();
      // closeParent.removeClass('expanded').hide();
      // console.log('closetarget:', closeParent);
      $(".ocean-section-grid-item.expanded").removeClass('expanded');
      $(".ocean-section-grid-row.expanded").removeClass('expanded').slideUp(); // .hide();
    }

    me.init = function($element){
      // console.log('init expandServiceItem:', $element);
      $element.click(expandServiceItem);
      // $element.click(expandServiceItem);
      $(".ocean-grid-item-close").click(closetarget);
    };
  

    // .ocean-grid-item-close close it




})(jQuery, IBMCore);
