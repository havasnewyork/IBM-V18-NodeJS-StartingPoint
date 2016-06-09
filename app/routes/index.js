var express = require('express');
var util = require('util');
var router = express.Router();
var config = require('../config/');
var _ = require('underscore');
// require other routes here
var app;

var indexContent = {index_links: []};

/* GET home page. */

// config.routes

// generic handler

function handler(req, res) {
  // for now we just do render statics
  // this.content will define either json or a db index to query
  console.log("Path Context: " + req.path);
  console.log(this.view);
  console.log(this.content);
  //  res.render(this.view, {content: this.content, template: config.template, title: config.siteTitle, nav: this.global_navigation, path: this.optional_path || this.path});
  res.render(this.view, {content: this.content, template: config.template, title: config.siteTitle, nav: this.global_navigation, path: this.path, optionalPath: this.optional_path});
}


function addroute(path, hdlr) {
  indexContent.index_links.push({url: path})
  console.log("ADDROUTE:", path);
  router.get(path, hdlr);
}

function addroutes(cfg, parentcfg) {
  // console.log('cfg here ' + util.inspect(cfg, false, null));
  // console.log('parentcfg here ' + util.inspect(parentcfg, false, null));
  _.each(cfg, function(routedef, path){
    // console.log(path, routedef, path);

    // grab inheritables from parent config
    if (parentcfg) {
      // console.log('from parentcfg', parentcfg.path);

      path = parentcfg.path + path; //
      _.extend(routedef.global_navigation, parentcfg.global_navigation); // no good
    }

    routedef.path = path; // setup for nested route defs

    // add main route
    addroute(path, handler.bind(routedef));

    // also listen to specified optional path
    if (routedef.optional_path) {
      addroute(path + routedef.optional_path, handler.bind(routedef));
    }

    // add sub routes
    if (routedef.routes) {
      addroutes(routedef.routes, routedef); // recursive and nested
    }
  })
}

// console.log('route setup:', config.routes);

addroutes(config.routes);

router.get('/', function(req, res) {

    // render our indexContent links collected in addroute

    res.render('index', indexContent);
});



router.get('/styleguide', function(req, res) {

    //
    res.render('styleguide', {template: config.template, title: config.siteTitle, nav: config.nav });

});




module.exports = function(expapp) {
    app = expapp;

    return router;
}
