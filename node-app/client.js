'use strict';

const express       = require ('express');
const fs            = require('fs');
var gzip            = require('gzip');
var http            = require('http');


/**
 * API call: http://<eureka-server-hostname>:port/eureka/v2/apps/appID
 * Http; POST
 */
exports.register = function(options,callback){
    var payload = {};
    if(options.usingAWSDataCenter == true){
        payload = options.awsMetaData;
    }else{
        payload = options.customMetaData;
    }
    var register_opts = {
        'host':options.eurekaServer.host,
        'port':options.eurekaServer.port,
        'path':'/eureka/v2/apps/'+options.awsMetaData.instance.app,
        'headers':{'Content-Type':'application/json'},
        'method':'POST'
    };

    var postRequest = http.request(register_opts, function(response){
        if(response.statusCode == 204){
            heartbeat(options)
            callback('success');
            console.log('Registration successful');
        }
    });
    postRequest.on('error', function(e){
        console.log('Problem with request: '+e.message);
    });
    postRequest.write(JSON.stringify(payload));
    postRequest.end();
};


/**
 * API call: http://<eureka-server-hostname>:port/eureka/v2/apps/appID/instanceID.
 * This code currently has a bug which is causing socket hang up. Socket hang up is usually faced by client when it does not hear from the server.
 * The same request is sent via POSTMAN and server does not seem to be responding.
 * Probable issues may be: either EurekaServer1 is not reachable or
 * Http: PUT
 */
function heartbeat (options){
    setInterval(function(){
        var heartbeat_opts = {
            'host': options.eurekaServer.host,
            'port': options.eurekaServer.port,
            'path':'/eureka/v2/apps/'+options.awsMetaData.instance.app+'/'+options.awsMetaData.instance.dataCenterInfo.metadata['instance-id'],
            'method':'PUT'
        };
        var heartbeatReq = http.request(heartbeat_opts, function(response){
            if(response.statusCode == 200){
                console.log('Heartbeat sent successfully');
            }else{
                console.log('Unusual response code from Sever: '+response.statusCode);
            }
        });
        heartbeatReq.on('error', function(error){
            console.log('Problem with Heartbeat Request: '+error.message);
        });
        heartbeatReq.end();
    }, 30000);
}

/**
 * API call: http://<eureka-server-hostname>:port/eureka/v2/apps/appID/instanceID
 */
exports.deRegister = function(){
}

/* Fetch registered applications every 30 seconds and update the cache.
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



