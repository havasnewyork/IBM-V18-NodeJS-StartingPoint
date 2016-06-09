var primarytabs = require('../primary-tabs.js');
module.exports = {
    view: "index",
    optional_path: "blockchain", // also honor requests for this........ TODO
    global_navigation: {
        site_def: {
            name: "IBM Blockchain",
            path: "/blockchain",
        },
        primary_tabs: primarytabs,
    },
    content: require('../pages/index.js'),
    routes: {

      "blockchain/index":require('../pages/blockchain-index.js'),
      "blockchain/testpage":require('../pages/testpage.js'),
      "blockchain/testpage/index":require('../pages/testpage.js'),
      "demos":require('../pages/demos.js'),

    } // END routes
}
