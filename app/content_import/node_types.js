module.exports = function() {
    // whitelist of ECM content nodes OR group names we care about - in content > shared data > type
    return [
    		"ECMCC_SITE_CONFIG",
        "ECMCC_STANDARD_PAGE",
        "ECMCC_IMAGE",
        "ECMCC_MULTIMEDIA",
        "ECMCC_IMAGE",
        "ECMCC_IBM_COLUMN",
        "ECMCC_FRAGMENT",
        "ECMCC_IBM_COLUMN",
        // interesting groups in a standard page
        "ECMCC_STANDARD_PAGE_SIDEBAR",
        "ECMCC_STANDARD_PAGE_SIDEBAR_FRAGMENTS",
        "ECMCC_STANDARD_PAGE_COLUMN",
        "ECMCC_STANDARD_PAGE_GRID_SECTION",
        "ECMCC_STANDARD_PAGE_OFFERING",
        // groups in an ibm column
        "ECMCC_IBM_COLUMN_NESTED_COLS",
        "ECMCC_IBM_COLUMN_SECTION",
        
        "ECMCC_FRAGMENT_TEXT",
        "ECMCC_FRAGMENT_IMAGE",
        "ECMCC_FRAGMENT_TABLE",
        "ECMCC_FRAGMENT_DIV",
        "ECMCC_FRAGMENT_FORM",
        "ECMCC_FRAGMENT_TABNAV",
        "ICC13",
        "ICC8"
    ]
}

/*
// fragment groups
group todo: ECMCC_DCDATE_GROUP
group todo: ECMCC_FRAGMENT_LISTINGS
group todo: ECMCC_FRAGMENT_TEXT
group todo: ECMCC_FRAGMENT_ITEM_LIST
group todo: ECMCC_FRAGMENT_ITEM
group todo: ECMCC_FRAGMENT_SUBITEM_ONE
group todo: ECMCC_FRAGMENT_SUBITEM_TWO
group todo: ECMCC_FRAGMENT_IMAGE
group todo: ECMCC_FRAGMENT_MULTIMEDIA
group todo: ECMCC_FRAGMENT_TABLE
group todo: ECMCC_FRAGMENT_DIV
group todo: ECMCC_FRAGMENT_FORM
group todo: ECMCC_FRAGMENT_Q71T
group todo: ECMCC_FRAGMENT_TABNAV
group todo: ECMCC_FRAGMENT_TWITTER
group todo: ECMCC_FRAGMENT_ACCORDION
group todo: ECMCC_FRAGMENT_SMA
group todo: ECMCC_FRAGMENT_BUTTON_LINKS
group todo: ECMCC_FRAGMENT_BUTTON_LINK
group todo: ECMCC_FRAGMENT_PULLQUOTES
group todo: ECMCC_FRAGMENT_TMPTEXT


// standard page groups

group todo: ECMCC_STANDARD_PAGE_BREADCRUMBTRAIL
group todo: ECMCC_NAVIGATION
group todo: ECMCC_STANDARD_PAGE_SIDEBAR
group todo: ECMCC_STANDARD_PAGE_SIDEBAR_FRAGMENTS
group todo: ECMCC_TAB_NAV
group todo: ECMCC_STANDARD_PAGE_EXTERNAL_FILE_VARS
group todo: ECMCC_STANDARD_PAGE_COLUMN
group todo: ECMCC_STANDARD_PAGE_COLUMN
group todo: ECMCC_STANDARD_PAGE_GRID_SECTION
group todo: ECMCC_STANDARD_PAGE_COLUMN
group todo: ECMCC_STANDARD_PAGE_GRID_SECTION
group todo: ECMCC_STANDARD_PAGE_COLUMN
group todo: ECMCC_STANDARD_PAGE_GRID_SECTION
group todo: ECMCC_STANDARD_PAGE_COLUMN
group todo: ECMCC_STANDARD_PAGE_GRID_SECTION
group todo: ECMCC_STANDARD_PAGE_COLUMN
group todo: ECMCC_STANDARD_PAGE_COLUMN
group todo: ECMCC_FRAGMENT_COLUMN_ONE
group todo: ECMCC_FRAGMENT_LISTING_ONE
group todo: ECMCC_FRAGMENT_COLUMN_TWO
group todo: ECMCC_FRAGMENT_LISTING_TWO
group todo: ECMCC_FRAGMENT_COLUMN_THREE
group todo: ECMCC_FRAGMENT_LISTING_THREE
group todo: ECMCC_FRAGMENT_COLUMN_FOUR
group todo: ECMCC_FRAGMENT_LISTING_FOUR
group todo: ECMCC_FRAGMENT_COLUMN_FIVE
group todo: ECMCC_FRAGMENT_LISTING_FIVE
group todo: ECMCC_FRAGMENT_COLUMN_SIX
group todo: ECMCC_FRAGMENT_LISTING_SIX
group todo: ECMCC_STANDARD_PAGE_ATOZ
group todo: ECMCC_STANDARD_PAGE_OFFERING
group todo: G_GREETING
group todo: SN_SIGNIN
group todo: EA_EASYACCESS
group todo: MG_MEGAMENU
group todo: FM_FOOTERMENU
group todo: F_FOOTER
group todo: MD_MERCHANDISING
group todo: SBS
group todo: EL_EXPERT_LOCATOR
group todo: EL_CONDITION
group todo: EL_CONDITION_OR
group todo: CMT_COMMENTER
group todo: BCD_BLUECARD
group todo: FF_FEEDBACK
group todo: TRANSWIDGET

*/