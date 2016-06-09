var express = require('express');
var router = express.Router();
var config = require('../config/');
var _ = require('underscore');
var jade = require('jade');


var app;


var RSS = require('rss');
 
 // all content references create our individual feeds

var feeds = {};

function generateFeedTemplates() {
    // app.schemas each do:


    app.db.dbs.schemas.view('schemas', 'all_schemas', function(err, data){
        // console.log('got list of all app schemas:', err, data);

        // data.rows pluck 'value'
        if (err) return console.warn('got error getting schemas for rss setup, no rss feeds will be available', err);
        _.each(data.rows, function(schema){
            console.log(schema.value, schema.key);
            feeds[schema.key] = new RSS({
                title: 'IBM Cloud Homepage Sections',
                description: 'Feed of content for IBM Cloud Homepage',
                feed_url: 'http://ocean-dev.mybluemix.net/rss/contents/' + schema.key,
                site_url: 'http://ocean-dev.mybluemix.net',
                // image_url: 'http://ocean-dev.mybluemix.net/icon.png',
                // docs: 'http://example.com/rss/docs.html',
                // managingEditor: 'Dylan Greene',
                // webMaster: 'Dylan Greene',
                // copyright: '2013 Dylan Greene',
                language: 'en',
                // categories: ['Category 1','Category 2','Category 3'],
                // pubDate: 'May 20, 2012 04:00:00 GMT',
                ttl: '60',
                custom_namespaces: {
                    "ibmwcm": "http://purl.org/net/ibmfeedsvc/wcm/1.0",
                }
            });
        });

    })


    

}


// content items get <ibmwcm:itemType>Content</ibmwcm:itemType>


router.get('/contents/:ref/:act?', function(req, res) {
    // http://local.ibm.com:3000/admin/contents/homepage_section
    // shamelessly C&P from regular one
    var schemaRef = req.params.ref || 'default';
    // content.view('content', 'all_content', 
    

    // if no reference how about we send all our feeds?

    var wcmAction = req.params.act || 'add';
    if ('add update delete'.indexOf(wcmAction) === -1) wcmAction = 'add'; // only these plz
    console.log('rss feed for:', schemaRef, wcmAction);
        // todo create the view that indexes by_schema_type
    app.db.getViewByIndex(app.db.dbs.content, 'index', 'content', 'by_schema_type', {keys: [schemaRef]}, function(err, data){
    // app.db.dbs.content.view('content', 'by_schema_type', {keys: [schemaRef]}, function(err, data){
        // console.log('got list of content by schema type:',schemaRef, err, data);
        // plz exclude id = _design/*
        // res.json(_.pluck(data.rows, 'value'));
        // feeds[schemaRef]; adding each item here
        var feed = feeds[schemaRef];
        // clear any previous items thanks
        // console.log(feed);
        
        if (!feed) return res.status(500).send("No content by that type.");

        feed.items = [];
        _.each(data.rows, function(row, index) {
            // oh we get to render these in jade yeah heh partials/item
            // but those will be different for each content type. 
            // for each schema we need a view partial to render it to - just name match for now.
            var html = jade.renderFile('views/partials/' + schemaRef + '.jade', {pretty: true, item: row.value, index: index});

            feed.item({
                title:  row.id,
                description: "test description",
                custom_elements: [
                    { "ibmwcm:itemType": "Content"},
                    { "ibmwcm:action": wcmAction },
                    // ibmwcm:authoringTemplate - Band-AT ?
                    { "ibmwcm:element": [
                        {_attr: {name: "body"}},
                        {"ibmwcm:type": "RICH TEXT"},
                        {"ibmwcm:value": {
                            _cdata: html
                        }}
                    ]}
                ]
                // ibmwcm:element(name="body")
                 // add / update / delete - could use a url param to control from outside
                // wcm fields here
                // url: 'http://example.com/article4?this&that', // link to the item 
                // guid: '1123', // optional - defaults to url 
                // categories: ['Category 1','Category 2','Category 3','Category 4'], // optional - array of item categories 
                // author: 'Guest Author', // optional - defaults to feed author property 
                // date: 'May 27, 2012', // any format that js Date can parse. 
                
            });

        });
        res.set('Content-Type', 'text/xml');
        res.send(feeds[schemaRef].xml()); // ahhh something like that yes
    })
});


module.exports = function(expapp) {
    app = expapp;
    // 
    router.init = function() {
       generateFeedTemplates(); 
    }
    return router;
}