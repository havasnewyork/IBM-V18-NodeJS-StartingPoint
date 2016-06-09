var express = require('express');
var path = require('path');
var argv = require('yargs').argv;
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var server;
var isBluemix = (process.env.VCAP_SERVICES);
var fs = require('fs');
var services = process.env.VCAP_SERVICES ? JSON.parse(process.env.VCAP_SERVICES) : require('./services');
var bluemix = require('./config/bluemix')(services);

var dbCreds = bluemix('couchdb-local');

if (isBluemix) dbCreds = bluemix('cloudantNoSQLDB');
// var dbCreds
// console.log('hello dbCreds:', dbCreds);
var config = require('./config/');

var app = express();


var exporter = require('./lib/exporter')(app);
var importer = require('./content_import/ecm_import'); // pass a folder within content_import to importer.parseFolder('RETAIL')
console.log('importer?', importer);
// just in case we need database

//         // if (false) {
//             // local mode - cache all db changes to the filesystem for pushing up to dev server.
//             var feed = app.db.dbs.content.follow({since: "now", include_docs: true});
//             feed.on('change', function (change) {

//               if (change.id === '_design/content') return;

//               // console.log("content db change: ", change);
//               var out = JSON.stringify(change.doc, null, '\t');
//               var filename = change.id + '.json';
//               var schemaPath = change.doc.schema_type;
//               if (schemaPath) {
//                 fs.writeFile('config/content/' + schemaPath + '/' + filename, out, function(err){
//                     // console.log('cached db to filesystem:', err);
//                 })
//               }

//               // app.db.dbs.content.get(change.id, function(err, changedDoc) {
//               //   console.log('full changed doc:', changedDoc);
//               // });
//             });
//             feed.follow();
//         // }





//         // make sure our schema views are in there
//         app.db.upsert('content',
//           { "views":
//             {
//                 "by_tag": { "map":
//                     function(doc) {
//                         if (doc.publishing) {
//                             if (!doc.publishing.published) return; // skip published = false content
//                         }
//                         emit(doc.summary.tags, doc);
//                     }
//                 },
//                 "all_content": { "map":
//                     function(doc) {
//                         if (doc._id.indexOf('_design') > -1) return; // exclude design docs
//                         emit(doc._id, doc);
//                     }
//                 },
//                 "by_schema_type": { "map":
//                     function(doc) {
//                         if (doc._id.indexOf('_design') > -1) return; // exclude design docs
//                         emit(doc.schema_type, doc);
//                     }
//                 },

//             }
//           }, '_design/content', function (error, response) {
//             // console.log("design view upserted:", error, response);
//             // db.view('content', 'by_tag')
//           });

//         // upsert our schema design views - we want to list all our schemas easily
//         app.db.upsert('schemas',
//           { "views":
//             {
//                 "all_schemas": {"map":
//                     function(doc) {
//                         if (doc._id.indexOf('_design') > -1) return; // exclude design docs
//                         emit(doc._id, doc);
//                     }
//                 }

//             }
//           }, '_design/schemas', function (error, response) {
//             // console.log("schema design view upserted:", error, response);
//             // db.view('content', 'by_tag')
//           });



//         // insert a default schema
//         if (config.defaultSchema) app.db.upsert('schemas', config.defaultSchema, 'default', function(err, obj){
//             // console.log('udpated default schema:', err, obj);
//         });

//         // upsert from config.schemas for more content types
//         if (config.schemas) {
//             // console.log('upserting schemas:', config.schemas.length);
//             for (var schema_name in config.schemas) {
//                 app.db.upsert('schemas', config.schemas[schema_name], schema_name, function(err, obj){
//                     // console.log('upserted a schema:', schema_name, err);
//                 });
//             }

//         }

//         // // upsert from config.hp_content as homepage_section schema
//         // if (config.hp_content) {
//         //     // console.log('upserting hp_content:', config.hp_content.length);
//         //     for (var contentIdx in config.hp_content) {
//         //         var content = config.hp_content[contentIdx];
//         //         content.schema_type = 'homepage_section';
//         //         app.db.upsert('content', content, content.label, function(err, obj){
//         //             // console.log('upserted a schema:', schema_name, err);
//         //         });
//         //     }
//         // }

//         // // for tier 2 content pages...

//         // // upsert from config.solutions_content as homepage_section schema
//         // if (config.solutions_content) {
//         //     // console.log('upserting solutions_content:', config.solutions_content.length);
//         //     for (var contentIdx in config.solutions_content) {
//         //         var content = config.solutions_content[contentIdx];
//         //         content.schema_type = 'solutions_section';
//         //         if (isBluemix) {
//         //             // special updateIfNewer goes here
//         //             //
//         //         } else {
//         //             app.db.upsert('content', content, content.label, function(err, obj){
//         //                 // console.log('upserted a schema:', schema_name, err);
//         //             });
//         //         }

//         //     }
//         // }

//         // must get dbs first then we can get rss which requires schemas loaded
//         // rssRoutes.init();


//         // if importer flags in argv
//         if (importer) {
//             if (argv.import) {
//                 console.log('importing xml folder:', argv.import);
//                 // use --import RETAIL for example...
//                 importer.parseFolder(argv.import);
//             }
//         }

//     }
// });

/*

db tables

schemas - store json schema types
content - plural form - all actual content pieces - make indexes on type according to schema names
users - TODO who did what and what they have access to

json editor schemas - make them user generatable and stored in the DB

TODOs

 - make sure we can cache out static HTML builds of all content pages

*/

// TODO BUILD A STATIC EXPORTER for all routes > cached html etc


// view engine setup
app.locals.pretty = true; // whitespace in htmls
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});


app.use(express.static(path.join(__dirname, 'public')));

// AUTH AFTER PUBLIC FOR PUBLIC FEED BACK UP BACK UP

if (config.auth) {
    var auth = require('./lib/basicAuth');
    if (config.auth.mode === 'basic') {

        app.use('*', auth.basicAuth(config.auth.credentials.username, config.auth.credentials.password));
    }

    if (config.auth.mode === 'basic-scoped') {
        // hostname-scoped basic auth
        app.use('*', auth.scopedBasicAuth(config.auth.credentials));
    }
}


app.use('/', require('./routes/index')(app));

// app.use('/admin', require('./routes/admin/')(app));

// var rssRoutes = require('./routes/rss')(app);
// app.use('/rss', rssRoutes);


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

if (!app.get('port')) app.set('port', process.env.VCAP_APP_PORT || process.env.PORT || 3000);

console.log(app.get('port'));
if (process.mainModule.filename.indexOf('bin/www') === -1) {
    // console.log('running not via www script...');
    server = app.listen(app.get('port'), function() {
      console.log('Express server listening on port ' + server.address().port);
    });

}


// run exporter LOCAL ONLY thx
if (exporter && !isBluemix) {
    // if (!isBluemix) exporter.render();
    console.log('checking args:', argv);
    if (argv.e) {
        // exporter on
        console.log('exporting:', argv.e);
        exporter.render(argv.e);
    }

}

module.exports = app;
