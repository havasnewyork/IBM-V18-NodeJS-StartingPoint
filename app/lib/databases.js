// databases.js

// automagic db & index creation / confirmation

module.exports = function(app, options) {

	var debug = console.log; //require('debug')('databases');
	
	var _ = require("underscore");
	var async = require("async");



	// required options - credentials, dbprefix, dbnames // TODO indexes leave it for now
	// debug('starting up database configurator for cloudant:', options);
	if (!options) return debug('no databases options passed');
	if (!options.credentials) return debug('no database credentials passed');
	if (!options.dbnames) return debug('no database dbnames array passed');
	// if (!options.dbindexes) // todo run for index checking optional

	var credentials = options.credentials;

	// database and index confirmation setup...
	var dbprefix = options.dbprefix || "";
	var dbnames = options.dbnames;
	var dbrefnames = options.dbrefnames || options.dbnames;

	var dbConnectCallback = options.callback || function(){ debug('null dbs ready callback')};

	debug('confirming dbs:', dbnames); //, 'confirming indexes on:', masterIndexList);
	var dbrefs = {}; // index of cloudant.use(dbname) by dbname -- attaches cloudant.use(db) refs here for use...
	var nano; // switched to nano so we can work with couchdb locally for dev convenience

	// confirm all dbs in names list exist - all_dbs is result of cloudant connecting and listing all dbs
	function confirmDatabases(names, all_dbs) {
		// debug('confirmDatabases:', arguments);
		// build async array of closures
		var tasks = _.map(names, function(dbname, i){
			var refname = dbrefnames[i];
			// console.log('refname for dbname:', refname, dbname, i);
			return function(callback){
				var fullname = dbprefix + dbname;
				if (all_dbs.indexOf(fullname) === -1) {
					debug('db not found, creating:', fullname, typeof nano.db.create);
					nano.db.create(fullname, function(err, ok){
						// console.log('create err?', err, ok)
						dbrefs[refname] = nano.db.use(fullname);
						callback(null, dbrefs[refname]);
					});
				} else {
					debug('db found, referencing:', fullname);
					dbrefs[refname]  = nano.db.use(fullname);
					callback(null, dbrefs[refname]);
				}
			}
		});
		async.parallel(tasks, function(err, results){
			debug('confirm dbs parallel error?', err);
			debug('confirm dbs parallel tasks:', results.length, names.length);
			if (results.length === names.length) {

				

				if (options.dbindexes) {
					debug('confirming db indexes...');
					confirmIndexes(masterIndexList);	
				} else {
					if (dbConnectCallback) { // set via options.callback
						dbConnectCallback();
					}
				}
				
			}
		});

		

	}

	// create INDEXES on eventId for each message / users / follows DBs
	function confirmIndexes(indexNameMap) {
		// base index def is an index on eventId for each db
		
		// needs single depth using indexNameMap messes with async func map
		var tasks = _.map(indexNameMap, function(dbAndIndex){ 
			// dbAndIndex is an object where key = db name and val = index ref name
			var dbname = _.keys(dbAndIndex)[0];
			var indexRefName = _.values(dbAndIndex)[0];
			// return an async parallel task function for each named db to check the eventIdIndex, creating if not exist
			return function(callback){
				var fullname = dbprefix + dbname;
				debug('get indexes:', dbname);
				dbrefs[dbname].index(function(er, result){
					
					var indexNames = _.pluck(result.indexes, 'name');

					debug(dbname + ' has indexes:', indexNames);
						
					var indexDef = indexDefs[indexRefName];
					debug('confirming an indexName:', indexDef);
					if (indexNames.indexOf(indexDef.name) === -1) {
						// create!
						dbrefs[dbname].index(indexDef, function(er, response) {
							if (er) callback(er, null);
						 
						  debug('Index creation result: %s', response.result, indexDef.name);
						  callback(null, dbprefix + dbname + " index created:" + indexDef.name);
						})
					} else {
						// we are good!
						callback(null, dbprefix + dbname + " index exists:" + indexDef.name);
					}
				

				});
			}
		});
		async.parallel(tasks, function(err, results){
			debug('confirm indexes parallel error?', err);
			debug('confirm indexes parallel tasks:', results.length, indexNameMap.length);
			if (results.length === indexNameMap.length) {
				debug('confirmed db indexes...');
				// needs async notification that all dbs are created and ready
				if (dbConnectCallback) { // set via options.callback
					dbConnectCallback();
				}
			}
		});
		
	}
	var fs = require('fs');
	function connectDb(skipConfirm, ok) {
		console.log('connect to:', credentials.username, credentials.password)
		var cookies = {};
		nano = require("nano")({

			requestDefaults: {
				// ca: fs.readFileSync('./config/ihecll02vip.ihe.ibm.com.ca.cert.pem', 'utf-8'),
				rejectUnauthorized: false
			},
			url: credentials.url,
			// hostname:credentials.host, 
			// account:credentials.username, 
			// password:credentials.password
		});
		
		// console.log('auth go:', credentials.username, credentials.password);

		nano.auth(credentials.username, credentials.password, function (err, body, headers) {
		  if (err) {
		  	console.log('auth err:', err);
		  	return dbConnectCallback(err); // tell top level callback about it!
		    // return callback(err);
		  }

		  // console.log('got auth:', err, headers);

		  if (headers && headers['set-cookie']) {
  			  cookies['user'] = headers['set-cookie'];
  			}

  			nano = require('nano')({
  				url: credentials.url,
  				cookie: cookies['user']
  			});

		  // nano.session(function(err, session) {
				//     if (err) {
				//       return console.log('oh noes!')
				//     }

				//     console.log('user is %s and has these roles: %j',
				//       session.userCtx.name, session.userCtx.roles);
		  // });



		  // callback(null, "it worked");
		  	// console.log('ok go cloudant db list?', nano.db.list);
		     // debug('Server version = %s', reply.version)
		     // debug('I am %s and my roles are %j', reply.userCtx.name, reply.userCtx.roles)
		  	if (skipConfirm) return skipConfirm(); 
		     nano.db.list(function(er, all_dbs) {
		       	if (er)
		         	return debug('Error listing databases: %s', er.message)
		  	
		       	debug('All my databases: %s', all_dbs.join(', '));
		       	// debug('specific message and users dbs:', all_dbs.indexOf(messageDbName), all_dbs.indexOf(onlineUsersDbName));
		       	confirmDatabases(dbnames, all_dbs);

		       	
		     });

		});

		// , function(er, instance) {
		  	// if (er) return debug('Error connecting to Cloudant account %s: %s', er, er.message);
		 	
			// cloudant = instance; // so we have our module-scoped reference
		 	
		// });
	}

	connectDb();

	// ERROR HANDLING - ECONNREFUSED, ENOTFOUND
	// TODO expose to module.exports so other db modules can call
	function handleError(socket, err) {
		if ((err.code === 'ECONNREFUSED') || (err.code === 'ENOTFOUND')) {
			debug('database connection refused!');
			socket.emit('servertrouble', 'dbconnection');
			// work up a periodical reconnector every N seconds?
			
			var reconnectInterval = setInterval(function(){
				debug('attempting db reconnect');
				connectDb(function(){
					dbConnectCallback();
					socket.emit('servertrouble:reconnect', 'dbconnection');
				}); // skip the confirmation this is a reconnect...
			}, 1000 * 5);
			postDbConnect(function(){
				debug('we reconnected, removing db reconnect loop');
				clearInterval(reconnectInterval);

			})
			
			return;
		} else {
			debug('handleError: UNKNOWN CASE:', err.code, err.error);
			// app.sdc.increment('dberrors.' + err.error); // some statsd
			// socket.emit('servererror', err); // this gets fired for 404s which we don't care about for if not exists insert logic
		}
	}

	function handleUpsert(dbname, doc, docid, callback) {
		// insert ? err ? delete & insert
		// console.log('handleUpsert:', dbname, docid);
		var db = dbrefs[dbname];
		if (!db) return callback("invalid db name");
		// todo use add_updated_timestamp updateWithHandler
		// db.updateWithHandler("content", "add_updated_timestamp", docid, doc, function (error, resdoc) {
		db.insert(doc, docid, function (error, resdoc) { // response-doc
		    if(error) {
				// return callback(error);
				// console.log('ok error on first insert', error.statusCode);
				// console.log('full error: ', error);
				db.get(docid, function(err, olddoc) {
					// ok here is bug - they have gotten a different error in the couchdb insert
					if (err) {
						// console.log('second error on get doc id:', docid, err);
						return callback(err);
					}
					// console.log('old doc updated:', olddoc);
				    doc._rev = olddoc._rev;
				    db.insert(doc, docid, function (error, response) {
			    	    if(error) {
			    			return callback(error);
			    	    } else {

			    	    }
				    });
				});
		    } else {
		    	callback(null, resdoc); // first insert worked
		    }
		});
	}

	function updateIfNewer(dbname, doc, docid, timestamp, callback) {
		// console.log('updateIfNewer:', dbname, docid, timestamp);
		var db = dbrefs[dbname];
		if (!db) return callback("invalid db name");

		// specialist for content coming from the config - dont overwrite online database if is newer?
		doc.ct = timestamp;
		db.updateWithHandler("content", "add_updated_timestamp_test", docid, doc, function (error, resdoc) {
			// console.log('updated if newer...', error, resdoc);
		});
	}

	function viewIndexed(db, indexKey, designname, viewname, params, callback) {
		// wrapper around db.view
		// optional params
		if (!callback && typeof params === 'function') {
			callback = params;
		}
		if (!callback) console.log('ah no callback but still go');

		db.view(designname, viewname, params, function(err, result){
			// console.log('view indexed manual sort:', err, result);
			// .. result.rows[n].value = actual doc.index
			result.rows.sort(function(row1, row2){
				// console.log('we sort', row2);
				return row1.value.index - row2.value.index;
			});
			callback(err, result);
		});
	}

	// follow content changes && cache to local filesystem IF NOT BLUEMIX



	return {
		getViewByIndex: viewIndexed, // better public name...
		dbs: dbrefs,
		handleError: handleError,
		upsert: handleUpsert,
		updateIfNewer: updateIfNewer
		// callWhenReady: postDbConnect
	}
}