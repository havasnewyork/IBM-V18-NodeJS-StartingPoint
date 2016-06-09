var basicAuth = require('basic-auth');


// http://www.danielstjules.com/2014/08/03/basic-auth-with-express-4/

/**
 * Simple basic auth middleware for use with Express 4.x.
 *
 * @example
 * app.use('/api-requiring-auth', utils.basicAuth('username', 'password'));
 *
 * @param   {string}   username Expected username
 * @param   {string}   password Expected password
 * @returns {function} Express 4 middleware requiring the given credentials
 */
exports.basicAuth = function(username, password) {
  return function(req, res, next) {
    var user = basicAuth(req);

    if (!user || user.name !== username || user.pass !== password) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.send(401);
    }

    next();
  };
};

// scope a set of creds to a hostname - if no hostname match then next()
exports.scopedBasicAuth = function(creds) {
    return function(req, res, next) {

        var hostname = req.headers.host;
        // no match GTFO & thx
        if (!creds[hostname]) return next();
        var matchCreds = creds[hostname];
        // now same as above...
        var user = basicAuth(req);
        if (!user || user.name !== matchCreds.username || user.pass !== matchCreds.password) {
          res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
          return res.send(401);
        }

        next();
    }
}