// index.js
//
var fs = require('fs');
var path = require('path');
var requireDir = require('require-dir');

var mkdirSync = function (path) {
  try {
    fs.mkdirSync(path);
  } catch(e) {
    if ( e.code != 'EEXIST' ) throw e;
  }
}
// for each dir we require make sure exists
// mkdirSync(path.join(__dirname, 'content', 'homepage_section'));
// mkdirSync(path.join(__dirname, 'content', 'infrastructure_section'));
// mkdirSync(path.join(__dirname, 'content', 'platform_section'));
// mkdirSync(path.join(__dirname, 'content', 'solutions_section'));
// mkdirSync(path.join(__dirname, 'content', 'newsfeed_content'));

// TODO build a GUID lookup util for auto-imported JSON.

// so for headline, use _refs: { headline: "GUID1", paragraph: "GUID2"}
// very fine grained OK lets us customize category and headline color in this exampple.

// and we find all _refs and match keys to target object keys, deleting _refs optionally

/*
solutions: [
    {
        category: "Shopping experience",
        headline: "Understand, connect and engage your customers to deliver personalized shopping experiences",
        headline_color: "magenta",
        paragraph: "Customers expect personalization and want a one-on-one relationship with your brand. Harness the vast amounts of customer data available to create a single view of each customer, find patterns and deliver more relevant promotions - both online and in-store.",
        link: "/retail/solutions/shopping-experience"
    },
    {
        category: "Merchandising and supply networks",
        headline: "Build an efficient merchandising and supply network to anticipate and meet the demands of empowered customers",
        headline_color: "blue",
        paragraph: "Technology can help you better understand complex, overlapping variables like consumer trends, demographics, seasonality and vendor limitations. With smarter merchandising and a more agile supply network, you can successfully match customers to offers and deliver merchandise with greater efficiency, transparency and accountability.",
        link: "/retail/solutions/merchandising-and-supply-networks"
    },
    {
        category: "Operations",
        headline: "Transform and optimize operations to improve performance and operational efficiency",
        headline_color: "green",
        paragraph: "Operations that are fluid, flexible and integrated drive benefits that go right to the bottom line. Today's efficient and highly-secure tools, technologies and services can improve your procurement, finance, administration, HR, budgeting, IT and business management functions.",
        link: "/retail/solutions/operations"
    }
],

*/

var Config = {
    auth: {
        // mode: 'basic',
        // credentials: {
        //     username: "havas",
        //     password: "d3vsit3", // dev pass

        //     // username: "industries",
        //     // password: "review4ibm", // client review pass
        // },
        mode: 'basic-scoped',
        credentials: {
            // "local.ibm.com:3000": {
            //     username: "local",
            //     password: "user",
            // },
            "blockchain-review.mybluemix.net": {
                username: "blockchain",
                password: "bc-r3v13w!",
            },
        }
    },
    template: 'v18',
    // siteTitle: 'HAL Naeco',
    siteTitle: 'IBM Corporate Social Responsibility',
    // pages: ["Infrastructure", "Platform", "Services", ""]
    // hp_content: requireDir('./content/homepage_section'),
    // infrastructure_content: requireDir('./content/infrastructure_section'),
    // platform_content: requireDir('./content/platform_section'),
    // solutions_content: requireDir('./content/solutions_section'),
    // newsfeed_content: requireDir('./content/newsfeed_content'), // we will make a vanilla rss feed for this
    adminNav: [
        // {label: 'Basic Content', href: '/admin', schema: 'default'},
        // {label: 'Social Items', href: '/admin/social_item', schema: 'social_item'},

        {label: 'Homepage Sections', href: '/admin/homepage_section', schema: 'homepage_section'},
        {label: 'Infrastructure Sections', href: '/admin/infrastructure_section', schema: 'infrastructure_section'},
        {label: 'Platform Sections', href: '/admin/platform_section', schema: 'platform_section'},
        {label: 'Solutions Sections', href: '/admin/solutions_section', schema: 'solutions_section'},
        {label: 'News Feed', href: '/admin/newsfeed_content', schema: 'newsfeed_content'},

        // {label: 'Pages', href: '/admin/pages'}
    ],
    routes: {
        "/": require('./content/index')
        // "/our-initiatives": require('./content/index'),
        // "/electronics": require('./content/electronics'),
        // "/communications": require('./content/communications'),
        // "/healthcare": require('./content/healthcare')
    },
    defaultSchema: {
        "properties": {
            "_deleted": {
                "title": "Delete ?",
                "type": "boolean",
                "format": "checkbox"
            },
            "_id": {"type": "string", "options": {"hidden": true }},
            "_rev": {"type": "string", "options": {"hidden": true }},
            "index": {"type": "number", "options": {"hidden": true }}, // display index - propigate to all db schemas
            "schema_type": {"type": "string", "options": {"hidden": true }},
            "label": { "type": "string" },
            "publishing": {
                "type": "object",
                "title": "Publishing",
                "properties": {
                    "published": { "type": "boolean" },
                }
            },
            "summary": {
                "type": "object",
                "title": "Summary Information",
                "properties": {
                    "brief": { "type": "string" },
                    "tags": { "type": "string" },
                }
            },
            "content": {
                "type": "object",
                "title": "Main Content",
                "properties": {
                    "headline": { "type": "string" },
                    "body": {
                        "type": "string",
                        "format": "html",
                        "options": {
                            "wysiwyg": true
                        }
                    }
                }
            }

        }
    },
    /* schema notes:
        for seamless DB integration,
        each should include the _deleted, _id, _rev, and schema_type properties on the top level
        c&p from here:

        "_deleted": {
            "title": "Delete ?",
            "type": "boolean",
            "format": "checkbox"
        },
        "_id": {"type": "string", "options": {"hidden": true }},
        "_rev": {"type": "string", "options": {"hidden": true }},
        "index": {"type": "number", "options": {"hidden": true }},
        "schema_type": {"type": "string", "options": {"hidden": true }},
        "label": {"type": "string"},

        // also all should have a label property at the top level for naming in schema arrays

    */
    schemas: {
        "nav_link": {
            "properties": {
                "label": {"type": "string"},
                "subtitle": {"type": "string"},
                "href": {"type": "string"},
            }
        },
        "featured_content": {
            // img, headline, paragraph
        },
        // "offer": {
        //     "properties": {
        //         // shape, headline, cta as nav link
        //     }
        // },
        // use as master for all second level pages - and just ref into regular schema
        "secondary_section": {
            properties: {
                "_deleted": {
                    "title": "Delete ?",
                    "type": "boolean",
                    "format": "checkbox"
                },
                "_id": {"type": "string", "options": {"hidden": true }},
                "_rev": {"type": "string", "options": {"hidden": true }},
                "index": {"type": "number", "options": {"hidden": true }},
                "schema_type": {"type": "string", "options": {"hidden": true }},
                "label": {"type": "string"},
                "band_classes": {"type": "string", "title": "Band Classes - Additional CSS class string for coloring, etc."},// .ocean-bg-purple_30.ocean-hero-band
                "band_type": {
                  "type": "array", "uniqueItems": true, "format": "select",
                  "items": {
                    "type": "string",
                    "enum": ["hero","regular", "full"] // 6-1 + 6-4 / 4-1 + 4-3 / no columns full video band
                  }
                },
                "title": {type: "string"}, // left column title
                "titleClass": {type: "string"}, // left column additional CSS class on title (blue pulse news custom)
                "subtitle": {type: "string"}, // left column subtitle
                "headline": {type: "string"}, // main area title
                "headlineColor": {type: "string"}, // main area title color map name
                "subhead": {type: "string"}, // main area subtitle
                "ctas": {
                    "type": "array",
                    "title": "CTAs",
                    "format": "tabs",
                    "options": { "disable_array_delete": false },
                    "items": {
                      "title": "CTA",
                      "headerTemplate": "{{i}} - {{self.label}}",
                      "type": "object",
                      "$ref": '/admin/schemas/nav_link'
                    }
                },
                "grid_options": {
                    type: "object",
                    properties: {
                        bgColor: {type: "string"}, // css color class ref "ocean-bg-purple_60"
                        fgColor: {type: "string"}, // css color class "ocean-fg-purple_40"
                    }
                },
                "grid_items": {
                    "type": "array",
                    "title": "Grid Items",
                    "format": "tabs",
                    "options": { "disable_array_delete": false },
                    "items": {
                      "title": "Grid Item",
                      "headerTemplate": "{{i}} - {{self.label}}",
                      "type": "object",
                      "$ref": '/admin/schemas/nav_link'
                    }
                },
                "promos": {
                    "type": "array",
                    "title": "Promo Items",
                    "format": "tabs",
                    "options": { "disable_array_delete": false },
                    "items": {
                        "title": "Promo Item",
                        "headerTemplate": "{{i}} - {{self.label}}",
                        "type": "object",
                        properties: {
                            label: {type: "string"},
                            shape: {type: "string"},
                            fillColor: {type: "string"},
                            headline: {type: "string"},
                            cta: {
                                type: "object",
                                "$ref": '/admin/schemas/nav_link'
                            }
                        }
                    }
                },
                "video": {
                    "type": "object",
                    properties: {
                        video_src: {type: "string"},
                        poster_src: {type: "string"},
                        // headline: {type: "string"},
                    }
                },
                "blockquote": {
                    "type": "object",
                    properties: {
                        quote: {type: "string"},
                        attribution: {type: "string"},
                        // headline: {type: "string"},
                    }
                },
                "news_feed": {type: "string"}
            }

        },
        "infrastructure_section": {
            "$ref": '/admin/schemas/secondary_section'
        },
        "platform_section": {
            "$ref": '/admin/schemas/secondary_section'
        },
        "solutions_section": {
            "$ref": '/admin/schemas/secondary_section'
        },
        "homepage_section": {
            "properties": {
                "_deleted": {
                    "title": "Delete ?",
                    "type": "boolean",
                    "format": "checkbox"
                },
                "_id": {"type": "string", "options": {"hidden": true }},
                "_rev": {"type": "string", "options": {"hidden": true }},
                "index": {"type": "number", "options": {"hidden": true }},
                "schema_type": {"type": "string", "options": {"hidden": true }},
                "label": {"type": "string"},
                "href": {"type": "string"},
                "title": {"type": "string"},
                "subtitle": {"type": "string"},
                "shape": {"type": "string"},
                "shapeAlt": {"type": "string"},
                "ctas": {
                    "type": "array",
                    "title": "CTAs",
                    "format": "tabs",
                    "options": { "disable_array_delete": false },
                    "items": {
                      "title": "CTA",
                      "headerTemplate": "{{i}} - {{self.label}}",
                      "type": "object",
                      "$ref": '/admin/schemas/nav_link'
                    }
                },
                "subnav": {
                    "type": "array",
                    "title": "Sub Navs",
                    "format": "tabs",
                    "options": { "disable_array_delete": false },
                    "items": {
                      "title": "Sub Nav",
                      "headerTemplate": "{{i}} - {{self.label}}",
                      "type": "object",
                      "$ref": '/admin/schemas/nav_link'
                    }
                }
            }
        },
        "newsfeed_content": {
            "properties": {
                "_deleted": {
                    "title": "Delete ?",
                    "type": "boolean",
                    "format": "checkbox"
                },
                "_id": {"type": "string", "options": {"hidden": true }},
                "_rev": {"type": "string", "options": {"hidden": true }},
                "index": {"type": "number", "options": {"hidden": true }},
                "schema_type": {"type": "string", "options": {"hidden": true }},
                "label": { "type": "string" },
                // type date title author categories
                "type": {
                  "type": "array", "uniqueItems": true, "format": "select",
                  "items": {
                    "type": "string",
                    "enum": ["news", "quota"] // 6-1 + 6-4 / 4-1 + 4-3 / no columns full video band
                  }
                },
                "date": {"type": "string", "format": "date"},
                "title": {"type": "string"},
                "content": {"type": "string"},
                "link": {"type": "string"},
                "mediaURL": {"type": "string"},

                "author": {"type": "string"},
                // "categories"

                "title": {"type": "string"},
            }
        }
    }
};

// console.log('dir of solutions solutions_content:', Config.solutions_content);

module.exports = Config;
