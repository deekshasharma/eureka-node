'use strict';

const express       = require ('express');
const fs            = require('fs');
const eureka        = require('eurekaClient/client');
const bodyParser    = require('body-parser');

const expressApplication = express();
/**
 * API call: http://<eureka-server-hostname>:port/eureka/v2/apps/appID
 * Http; POST
 */
exports.register = function(options){
    var payload = {}
    if(this.options.usingAWSDataCenter == true){
        payload = options.awsMetadata;
    }else{
        payload = options.customMetaData;
    }
    var request = {
        'url':'http://'+options.host+':'+options.port+'/eureka/v2/apps/'+options.appID,
        'method':'POST',
        'headers':{'Content-Type':'application/json'},
        'json': true,
        'body': JSON.stringify(payload)
    };
    expressApplication.use(bodyParser.json());
    expressApplication.use(bodyParser.urlendcoded({extended: true}));
    expressApplication.post('/', function(request, response){
        console.log(response.status);
	})
};

/**
 * API call: http://<eureka-server-hostname>:port/eureka/v2/apps/appID/instanceID
 * Http: PUT
 */
exports.heartbeat = function(options){
    var heartbeatUrl = 'http://'+options.host+':'+options.port+'/eureka/v2/apps/'+options.appID+'/'+options.instanceID;
	app.put(heartbeatUrl, function(request, response){
        if(request){

        }
        else{
            console.log(response.status)
        }
    });
}

/**
 * API call: http://<eureka-server-hostname>:port/eureka/v2/apps/appID/instanceID
 */
exports.deRegister = function(){
	app.delete();
}

/**
 * API call: http://<eureka-server-hostname>:port/eureka/v2/apps/
 */
exports.fetchRegistry = function(){
	app.get('/', function (request, response) {
    });
}


/**
 * API call: http://<eureka-server-hostname>:port/eureka/v2/instances/instanceID
 */
exports.getThisApp = function(){
	app.get();
}


/**
 * API call: http://<eureka-server-hostname>:port/eureka/v2/apps/
 */
exports.getAllApps = function(){
	app.get();
}



