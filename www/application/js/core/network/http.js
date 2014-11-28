/**
 * @author jbaudin
 */
define(['angular'], function(angular) {
    'use strict';
    
    var httpreq = function($http) {
        var call = function() {};
        
        function serialize(obj, prefix) {
            var str = [];
            for(var p in obj) {
                if (obj.hasOwnProperty(p)) {
                    var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
                    str.push(typeof v == "object" ? serialize(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
                }
            }
            return str.join("&");
        }
        
        call.prototype.restjsonp = function(url, method, data, callback) {
            if (typeof url === 'string' && typeof callback === 'function') {
                if ((typeof method != 'string')) {
                    method = 'POST';
                }

                if (data==null)
                    data = {};

                if (secureCall == null)
                    secureCall = true;

                data.method = method;

                if (secureCall)
                    data = this.signRequest(data);

                data.jsoncallback = 'JSON_CALLBACK';

                url += '?';

                for (var i in data) {
                    if (typeof data[i] === 'object' || typeof data[i] === 'array')
                        url += serialize(data[i], i)
                    else
                        url += encodeURIComponent(i)+'='+encodeURIComponent(data[i])+'&';
                }
                
                var that = this;
                
                $http.jsonp(url).then(
                    function(r) {
                        callback({code:200, response:r}, that);
                    },
                    function(r) {
                        callback({code:401, response:r}, that);
                    }
                );
                return true;
            }
            return false;
        };
        
        call.prototype.restget = function(url, config, callback) {
            if (typeof url === 'string' && typeof callback === 'function') {
                $http.get(url, config).success(
                    function(data, status, headers, config) {
                        if (status === 200) {
                            callback(data);
                        } else {
                            var obj = {};
                            // TODO increase precision of error traces
                            obj.label = error;
                            obj.status = status;
                            obj.data = data;
                            callback(data);
                        }
                    }
                ).error(
                    function(data, status, headers, config) {
                        console.log('an error occured during HTTP get request');
                        callback(data);
                    }
                );
                return true;
            }
            return false;
        };
        
        call.prototype.restpost = function(url, data, config, callback) {
            if (typeof url === 'string' && typeof callback === 'function') {
                $http.post(url, data, config).success(
                    function(data, status, headers, config) {
                        if (status === 200) {
                            callback(data);
                        } else {
                            var obj = {};
                            // TODO increase precision of error traces
                            obj.label = error;
                            obj.status = status;
                            obj.data = data;
                            callback(data);
                        }
                    }
                ).error(
                    function(data, status, headers, config) {
                        console.log('an error occured during HTTP post request');
                        callback(data);
                    }
                );
                return true;
            }
            return false;
        };
        
        call.prototype.restput = function(url, data, config, callback) {
            if (typeof url === 'string' && typeof callback === 'function') {
                $http.put(url, data, config).success(
                    function(data, status, headers, config) {
                        if (status === 200) {
                            callback(data);
                        } else {
                            var obj = {};
                            // TODO increase precision of error traces
                            obj.label = error;
                            obj.status = status;
                            obj.data = data;
                            callback(data);
                        }
                    }
                ).error(
                    function(data, status, headers, config) {
                        console.log('an error occured during HTTP put request');
                        callback(data);
                    }
                );
                return true;
            }
            return false;
        };
        
        call.prototype.restdelete = function(url, config, callback) {
            if (typeof url === 'string' && typeof callback === 'function') {
                $http.delete(url, config).success(
                    function(data, status, headers, config) {
                        if (status === 200) {
                            callback(data);
                        } else {
                            var obj = {};
                            // TODO increase precision of error traces
                            obj.label = error;
                            obj.status = status;
                            obj.data = data;
                            callback(data);
                        }
                    }
                ).error(
                    function(data, status, headers, config) {
                        console.log('an error occured during HTTP delete request');
                        callback(data);
                    }
                );
                return true;
            }
            return false;
        };
        
        return call;
    };
    
    httpreq.$inject = ['$http'];
    
    return httpreq;
});