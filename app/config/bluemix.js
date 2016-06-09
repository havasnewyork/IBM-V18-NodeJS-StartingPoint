'use strict';

/**
 * if VCAP_SERVICES exists then it returns
 * username, password and url
 * for the first service that stars with 'name' or {} otherwise
 * @param  String name, service name
 * @return [Object] the service credentials or {} if
 * name is not found in VCAP_SERVICES
 */

var services;

module.exports = function(json){
    console.log('config bluemix:', json);
    services = json;

    return (function(name) {
            if (!services) {
                services = JSON.parse(process.env.VCAP_SERVICES);
            }

            for (var service_name in services) {
                if (service_name.indexOf(name) === 0) {
                    var service = services[service_name][0];
                    return service.credentials; 
                }
            }
            
            return {};
        })
}