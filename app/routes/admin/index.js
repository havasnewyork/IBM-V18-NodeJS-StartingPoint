var express = require('express');
var router = express.Router();
var config = require('../../config/');
var _ = require('underscore');

var app;
// require other routes here



/* GET home page. */
router.get('/', function(req, res) {


  // res.render('admin', { title: "Admin CMS", nav: config.adminNav, schema: 'default' });
  res.redirect('/admin/homepage_section');

});

// for config each content type schema do more routes ok
// for (var schema_name in config.schemas) {
    // console.log('routing for schema editor:', schema_name);

    router.get('/:schema_name', function(req, res){
        // generic schema thingy
        var schema_name = req.params.schema_name;
        // if (!req.params.schema_name) return 
        if (config.schemas[schema_name]) {
            res.render('admin', { title: "Admin CMS " + schema_name, nav: config.adminNav, schema: schema_name });
            return;
        }
        res.redirect('/admin');
        
    });
// }
// types / items / pages are the viewing paths... use other names for ajaxing data back and forth


router.get('/schemas/:ref', function(req, res) {
    console.log('getting schema ref:', req.params.ref);
    app.db.dbs.schemas.get(req.params.ref.replace('.json', ''), function(err, doc){
        console.log(err, doc);
        if (err) return res.status(err.statusCode).send(err);
        res.json(doc);
    });
});

router.post('/contents/:ref', function(req, res) {
    console.log('post content:', req.body, req.params.ref);
    var schemaRef = req.params.ref || 'default';
    if (req.body.save) {

        // TODO account for what schema this is and create views that get them
        // bulk insert this array
        //TODO try/catch the parse ok
        var save = JSON.parse(req.body.save);
        console.log(save, save.length);
        _.each(save, function(doc, index){ 
            doc.schema_type = schemaRef;
            doc.index = index;
        }); // ok here we go with tagging content with what schema
        app.db.dbs.content.bulk({docs: save}, function(err, bulkStatus){
            console.log('did we bulk save:', err, bulkStatus);
        })
    }
    
    res.send('ok');
})

router.get('/contents/:ref', function(req, res) {
    var schemaRef = req.params.ref || 'default';
    // content.view('content', 'all_content', 
        // todo create the view that indexes by_schema_type
        // )
    // app.db.dbs.content.view('
    app.db.getViewByIndex(app.db.dbs.content, 'index', 'content', 'by_schema_type', {keys: [schemaRef]}, function(err, data){
        console.log('got list of content by schema type:',schemaRef, err, data);
        // plz exclude id = _design/*
        res.json(_.pluck(data.rows, 'value'));
    })


});




module.exports = function(expapp) {
    app = expapp;
    // app.use('/platform', require('./platform'));
    // addl routes here

    return router;
}
