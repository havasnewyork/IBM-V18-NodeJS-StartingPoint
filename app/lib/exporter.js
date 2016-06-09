// exporter.js

var request = require('request'); // we will make requests against localhost ha
var fs = require('fs');
var _ = require('underscore-node');
var config = require('../config/');

module.exports = function(app) {

    // for all routes in app render them and capture the HTML in flat files

    function getRoutes(stack, list) {
        // each route in stack get the method and path
        // push onto list
        // route: { path: '/', stack: [Object], methods: [Object] } },
        for (var key in stack) {
            if (!stack.hasOwnProperty(key)) continue;
            var routeObj = stack[key];
            // console.log('deep route:', routeObj);
            if (!routeObj.route) continue;
            // if (routeObj.route.stack) getRoutes(routeObj.route.stack, list);
            console.log('route path:', routeObj.route.path);
            list.push(routeObj.route.path);

        }
    }


    function getRouteTargets() {
        var routeTargets = [];
        console.log('exporter running...');
        console.log('router stack length:', app._router.stack.length);
        for (var key in app._router.stack) {
            if (!app._router.stack.hasOwnProperty(key)) continue;
            
            var val = app._router.stack[key];
            if (val.route) {
                routeTargets.push(val.route.path);
            }
            if(val.handle.stack) {
                console.log('sub routes in:', val);
                getRoutes(val.handle.stack, routeTargets);
            } 
        }
        
        routeTargets = _.uniq(routeTargets);
        
        routeTargets = _.filter(routeTargets, function(path) {
            if (path.indexOf(":") > -1) return false;
            return true;
        });

        console.log(routeTargets);

        return routeTargets;
    }
    function renderApp(hostname) {
        var paths = getRouteTargets();
        paths.push('/stylesheets/style.css');
        paths.push('/javascripts/main.js');
        for (var key in paths) {
            var path = paths[key];
            var out = path;
            if (out === '/') out = '/index';
            if (out.indexOf('.') === -1) out += '.html'; // no file extension add .html
            
            var url = 'http://127.0.0.1:' + app.get('port') + path;
            // if (hostname) {
            //     url = 'http://' + hostname + path;
            //     out = out.replace('.html', '-' + hostname + '.html');
            // }
            console.log('out:', url, out);
            // make sure to create any subdirectories required
            var dir = path.split('/');
            dir.pop();
            dir = dir.join('/');
            console.log('creating just in case:', dir);
            if (dir) {
                try {
                    fs.mkdirSync('cache' + dir);
                } catch (e) {
                    
                }
                
            }
            request.get(url, {
                // 'auth': {
                //     'user': config.auth.credentials.username,
                //     'pass': config.auth.credentials.password
                //   }
            }).pipe(fs.createWriteStream('cache' + out));
        }
    }


    return {
        render: renderApp
    }
}