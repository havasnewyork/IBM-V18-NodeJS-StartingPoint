module.exports = function() {
	// mapping of field names to JSON keys
	return {
		// "Q321481Y09850P41": {
		// 	"LINK_TEXT": "siteTitle",
		// 	"LINK_URL": "siteUrl",
		// },
		// "U671630E94058W74": {
			"ECMCC_STANDARD_PAGE_PATH": "route",
			"ECMCC_STANDARD_PAGE_FILENAME": "optional_path",
			"ECMCC_STANDARD_PAGE_DEFAULT_TYPES": "view",
			// "ECMCC_STANDARD_PAGE_DEFAULT_COLUMN_TYPES": "TBD",
			// "ECMCC_META_IBM_LOCALE": "en_US United States - English[==]J440803B67229F52",
			// "ECMCC_META_INDUSTRY": "No specified industry[==]W322917H57349A95"
			"ECMCC_META_KEYWORDS": "meta.keywords",
			"ECMCC_META_DESCRIPTION": "meta.description",
			"ECMCC_META_TITLE": "head.title",
			"ECMCC_LEADSPACE_TITLE": "content.page_headline", //, "routes.[folder].global_navigation.primary_tabs[1].label"],
			"ECMCC_LEADSPACE_SUBTITLE": "content.page_subhead",
			
			// "ECMCC_LEADSPACE_SUBTITLE_TEXTAREA": "content.subhead.textarea",

			// "ECMCC_LEADSPACE_BUTTON": "is leadspace button enabled"
			// "ECMCC_LEADSPACE_FRAGMENT": "Q573149W29964E80 = fragment id for leadspace button content"
			"ECMCC_LEADSPACE_FRAGMENT": "leadspace.id",
			"ECMCC_LEADSPACE_BACKGROUND_IMAGE_SELECT": "leadspace.bkgdId",
			
			"ECMCC_FRAGMENT_TEXTAREA": "textarea",
			"ECMCC_IBM_COLUMN_TAB_DYNAMIC": "isDynamicTag",

			"ECMCC_IBM_COLUMN_NESTED_SELECT": "nestedGuid",

			"ECMCC_MULTIMEDIA_JAVASCRIPT_REFERENCE_URL": "jsUrl",

		// },
		// "X283452F86735P39": {
		// 	// "ECMCC_SITE_META_TAG_VALUE": "site_group",
		// 	// "X830785G96800U45": {
		// 	// "ECMCC_SITE_META_TAG_VALUE": "site_name"
		// 	// }
		// },
		// "I081478O63113G91": {
			"ECMCC_IBM_COLUMN_TEXTAREA": "columnText",
		// },
		// "Q975221O62398K84": {
			"ECMCC_IMAGE_ATTACH_PATH": "path",
			// "ECMCC_IMAGE_ATTACH_PATH", 
			"ECMCC_IMAGE_FILE": "file",
			"ECMCC_IMAGE_FILE_ALT": "alt",
			// "ECMCC_COMMENT_TEXTAREA": "not sure it has html but is not visible on page"
			// "ECMCC_METADATA_CUSTOM_TAGS": "is a group name for a custom tag",
			// "ECMCC_META_CUSTOM_NAME": "IBM.WTMCategory",
			"ECMCC_IMAGE_TYPE": "image.type",
		// },
		// "U133417M94188D90": {
			"ECMCC_MULTIMEDIA_ATTACH_PATH": "media.path",
			"ECMCC_MULTIMEDIA_FILE": "media.file",
		// },
		// "H416331M25973F86": {
			// "ECMCC_MULTIMEDIA_ATTACH_PATH": "media.path",
			// "ECMCC_MULTIMEDIA_FILE": "media.file",
		// },

		"S940446I07023U17": {
			"TAB_ITEM_TEXT": "routes.[folder].global_navigation.primary_tabs[0].label",
			"TAB_ITEM_URL": "routes.[folder].global_navigation.primary_tabs[0].href",

			"S215192N14322Y36": {
				"TAB_ITEM_TEXT": ["routes.[folder].content.retail_solutions[0].category", "routes.[folder].global_navigation.primary_tabs[1].secondary_tabs[0].label"],
				"TAB_ITEM_URL": ["routes.[folder].content.retail_solutions[0].link", "routes.[folder].global_navigation.primary_tabs[1].secondary_tabs[0].href"]
			},
			"A760824O54732S42": {
				"TAB_ITEM_TEXT": ["routes.[folder].content.retail_solutions[1].category", "routes.[folder].global_navigation.primary_tabs[1].secondary_tabs[1].label"],
				"TAB_ITEM_URL": ["routes.[folder].content.retail_solutions[1].link", "routes.[folder].global_navigation.primary_tabs[1].secondary_tabs[1].href"]
			},
			"V985378U75570A34": {
				"TAB_ITEM_TEXT": ["routes.[folder].content.retail_solutions[2].category", "routes.[folder].global_navigation.primary_tabs[1].secondary_tabs[2].label"],
				"TAB_ITEM_URL": ["routes.[folder].content.retail_solutions[2].link", "routes.[folder].global_navigation.primary_tabs[1].secondary_tabs[2].href"]
			},
			"C902340J11954J36": {
				"SUBTAB_LINK_TEXT": "routes.[folder].global_navigation.primary_tabs[2].label",
				"SUBTAB_LINK_URL": "routes.[folder].global_navigation.primary_tabs[2].href"
			},
			"R898687N80765X20": {
				"SUBTAB_LINK_TEXT": "routes.[folder].global_navigation.primary_tabs[3].label",
				"SUBTAB_LINK_URL": "routes.[folder].global_navigation.primary_tabs[3].href"
			}
		},
		"K483446V99054H74": {
			"R116429F21433Z08": {
				"ECMCC_FRAGMENT_TEXTAREA": "routes.[folder].content.retail_solutions[0].headline"
			}
		},
		"N444214Y69967H95": {
			"N752490L97940E87": {
				"ECMCC_FRAGMENT_TEXTAREA": "routes.[folder].content.retail_solutions[1].headline"
			}
		},
		"A896018X27426A31": {
			"B019227P69804B64": {
				"ECMCC_FRAGMENT_TEXTAREA": "routes.[folder].content.retail_solutions[2].headline"
			}
		},
		"O806684J93166W13": {
			"R516404A21139S04": {
				"ECMCC_FRAGMENT_TEXTAREA": "routes.[folder].content.retail_solutions[0].paragraph"
			}
		},
		"Q619178Z47062W99": {
			"G589165T75035M90": {
				"ECMCC_FRAGMENT_TEXTAREA": "routes.[folder].content.retail_solutions[1].paragraph"
			}
		},
		"P010397E45407K40": {
			"L423561C02191B14": {
				"ECMCC_FRAGMENT_TEXTAREA": "routes.[folder].content.retail_solutions[2].paragraph"
			}
		}
	}
}