(function() {
    var widget = {};
    widget.settings = {
        uri: null,
        api_uri: null,
        session: null,
        token: null
    };
    widget.api = {};

    widget.transforms = {};

    widget.isNull = function(o) {
        var _ref;
        return (_ref = o === null || o === void 0) != null ? _ref : {
            "true": false
        };
    };

    widget.isNone = function(o) {
        var _ref, _ref1;
        if (o === null || o === void 0) {
            return true;
        }
        if (Object.prototype.toString.call(o) === '[object Array]') {
            return (_ref = o.length === 0) != null ? _ref : {
                "true": false
            };
        }
        if (typeof o === 'string') {
            return (_ref1 = o.trim() === "") != null ? _ref1 : {
                "true": false
            };
        }
        return false;
    };

    widget.isNum = function(o) {
        return !isNaN(parseFloat(o)) && isFinite(o);
    };

    widget.notNum = function(o) {
        return isNaN(parseFloat(o)) || !isFinite(o);
    };

    widget.isString = function(o) {
        var _ref;
        return (_ref = typeof o === 'string') != null ? _ref : {
            "true": false
        };
    };

    widget.notString = function(o) {
        var _ref;
        return (_ref = typeof o !== 'string') != null ? _ref : {
            "true": false
        };
    };

    widget.isArray = function(o) {
        var _ref;
        return (_ref = Object.prototype.toString.call(o) === '[object Array]') != null ? _ref : {
            "true": false
        };
    };

    widget.notArray = function(o) {
        var _ref;
        return (_ref = Object.prototype.toString.call(o) !== '[object Array]') != null ? _ref : {
            "true": false
        };
    };

    widget.isBool = function(o) {
        var _ref;
        return (_ref = Object.prototype.toString.call(o) === '[object Boolean]') != null ? _ref : {
            "true": false
        };
    };

    widget.notBool = function(o) {
        var _ref;
        return (_ref = Object.prototype.toString.call(o) !== '[object Boolean]') != null ? _ref : {
            "true": false
        };
    };

    widget.isDate = function(o) {
        var _ref;
        return (_ref = Object.prototype.toString.call(o) === '[object Date]') != null ? _ref : {
            "true": false
        };
    };

    widget.notDate = function(o) {
        var _ref;
        return (_ref = Object.prototype.toString.call(o) !== '[object Date]') != null ? _ref : {
            "true": false
        };
    };

    widget.isObject = function(o) {
        var _ref;
        return (_ref = Object.prototype.toString.call(o) === '[object Object]') != null ? _ref : {
            "true": false
        };
    };

    widget.notObject = function(o) {
        var _ref;
        return (_ref = Object.prototype.toString.call(o) !== '[object Object]') != null ? _ref : {
            "true": false
        };
    };

    widget.isFunction = function(o) {
        return !!(o && o.constructor && o.call && o.apply);
    };

    widget.toNum = function(o) {
        return parseInt(o);
    };

    widget.getProperties = function(o, filter) {
        var id, key, lst, val, _i, _j, _len, _len1;
        lst = [];
        if (filter === void 0 || filter === null) {
            for (val = _i = 0, _len = o.length; _i < _len; val = ++_i) {
                key = o[val];
                lst.push(key);
            }
        } else {
            for (val = _j = 0, _len1 = o.length; _j < _len1; val = ++_j) {
                key = o[val];
                id = key.toLowerCase();
                if (filter[id] === void 0) {
                    lst.push(key);
                }
            }
        }
        return lst;
    };

    widget.clone = function(o) {
        var cpy, element, i, key, val, _i, _j, _k, _len, _len1, _ref;
        if (Object.prototype.toString.call(o) === '[object Array]') {
            cpy = [];
            for (_i = 0, _len = o.length; _i < _len; _i++) {
                element = o[_i];
                cpy.push(element);
            }
            return cpy;
            for (i = _j = 0, _ref = o.length; 0 <= _ref ? _j < _ref : _j > _ref; i = 0 <= _ref ? ++_j : --_j) {
                cpy.push(o[i]);
            }
            return cpy;
        }
        if (Object.prototype.toString.call(o) === '[object Object]') {
            cpy = {};
            for (val = _k = 0, _len1 = o.length; _k < _len1; val = ++_k) {
                key = o[val];
                cpy[key] = val;
            }
            return cpy;
        }
        return o;
    };

    widget.startswith = function(a, b) {
        var _ref, _ref1;
        if (typeof a === 'string') {
            return (_ref = a.indexOf(b) === 0) != null ? _ref : {
                "true": false
            };
        }
        if (Object.prototype.toString.call(a) === '[object Array]') {
            return (_ref1 = a.length > 0 && a[0] === b) != null ? _ref1 : {
                "true": false
            };
        }
        return false;
    };

    widget.endswith = function(a, b) {
        var _ref, _ref1;
        if (typeof a === 'string') {
            return (_ref = a.indexOf(b) === (a.length - b.length)) != null ? _ref : {
                "true": false
            };
        }
        if (Object.prototype.toString.call(a) === '[object Array]') {
            return (_ref1 = a.length > 0 && a[a.length - 1] === b) != null ? _ref1 : {
                "true": false
            };
        }
        return false;
    };

    widget.json = function(o) {
        try {
            return JSON.stringify(o);
        } catch (_error) {}
        return {
            "catch": function(e) {
                console.log("JSON.encode.error-> " + e);
                throw e;
            }
        };
    };

    widget.unjson = function(o) {
        try {
            return JSON.parse(o);
        } catch (_error) {}
        return {
            "catch": function(e) {
                console.log("JSON.decode.error-> " + e);
                throw e;
            }
        };
    };

    widget.base36 = function(o) {
        try {

        } catch (_error) {}
        return o.toString(36);
        return {
            "catch": function(e) {
                if (o === null || o === void 0) {
                    throw new Error("The parameter is null. Unable to encode to base36.");
                }
                if (isNaN(parseFloat(o)) || !isFinite(o)) {
                    throw new Error("The parameter is not a valid numeric value. Unable to encode to base36.");
                }
                throw e;
            }
        };
    };

    widget.unbase36 = function(o) {
        try {
            return parseInt(o, 36);
        } catch (_error) {}
        return {
            "catch": function(e) {
                if (o === null || o === void 0) {
                    throw new Error("The parameter is null. Unable to decode from base36.");
                }
                throw e;
            }
        };
    };

    widget.base64 = function(o) {
        try {
            return new Buffer(data, "utf8").toString("base64");
        } catch (_error) {}
        return {
            "catch": function(e) {
                throw new Error("The base64 encoder is not loaded!");
            }
        };
    };

    widget.unbase64 = function(o) {
        try {
            return new Buffer(data, "base64").toString("utf8");
        } catch (_error) {}
        return {
            "catch": function(e) {
                throw new Error("The base64 decoder is not loaded!");
            }
        };
    };

    widget.debug = function(o) {
        try {
            console.log(o);
        } catch (_error) {}
        return {
            "catch": function(e) {
                return alert("Unable to write to the console.");
            }
        };
    };

    widget.stringify = function() {
        try {
            var buffer = [];
            for (var i = 0; i < arguments.length; i++)
                buffer.push(arguments[i]);

            var txt = buffer.join(" ");
            return txt;
        } catch (_error) {}
        return {
            "catch": function(e) {
                return alert("Unable to write to the console.");
            }
        };
    };

    widget.curry = function(fn, scope) {
        var args, slice;
        slice = Array.prototype.slice;
        args = slice.call(arguments, 1);
        return function() {
            return fn.apply(scope, args.concat(slice.call(arguments)));
        };
    };

    widget.chained = function(){
	    var cnt = arguments.length;
	    var fns = [];
	    for(var i = 0; i<cnt; i++){
	        var fn = arguments[i];
	        if(widget.isFunction(fn) === false){
	            throw new Error("The argument is not a valid function type!");
	        }
	        fns.push(fn);
	    }
	    
	    return function(o){
	        for(var i = 0; i<fns.length; i++){
	            var fn = fns[i];
	            o = fn(o);
	        }
	        return o;
	    };
	};


    widget.invoke = function(){
        widget.debug(arguments);
        var type = "GET";
        var cnt = arguments.length;
        var method = arguments[0];
        var params = arguments[1];
        var callback = arguments[cnt - 1];

        var onRequest = null;
        var onResponse = null;
        if(widget.isObject(method)){
        	onRequest = method.onRequest;
        	onResponse = method.onResponse;
        	method = arguments[1];
        	params = arguments[2];
        }
        if(callback === params){
        	params = null;
        }
        //method = "/" + method;
        if(params !== null){
        	type = "POST";
        }

        var uri = (widget.settings.api_uri + "/" + method);
        if(widget.settings.token !== null){
        	if(uri.indexOf("?") == -1){
            	uri = (uri + "?token=" + widget.settings.token);
            }else{
            	uri = (uri + "&token=" + widget.settings.token);
            }
        }

        function onSuccess(trace, callback, object){
        	if(trace !== null){
        		trace(object);
        	}

        	//console.log("SUCcESS!");
        	//console.log(object);
        	//console.log(callback);
        	callback(object);
        }
        onSuccessCallback = widget.curry(onSuccess, onResponse, callback);

        if(onRequest !== null){
        	var request = {};
        	if(params !== null){
        		request["params"] = params;
        	}
        	request["uri"] = uri;
        	onRequest(request);
        }

        if(type === "GET"){
            /**GET REQUEST**/
            $.ajax({
                url: uri,
                type: "GET",
                crossDomain: true,
                dataType: "jsonp",
                success: onSuccessCallback,
                //jsonpCallback: success_callback,
                error: function(o){
                    console.log("ERROR!");
                    console.log(o);
                }
            });
        }else{
            /**POST REQUEST**/
            $.ajax({
                url: uri,
                type: "POST",
                data: params,
                crossDomain: true,
                dataType: "jsonp",
                success: onSuccessCallback,
                error: function(){
                    alert("ERROR!");
                }
            });
        }
    };

    widget.api.get = function(name){
        var endpoint = widget.api[name];
        if(endpoint === undefined){
            endpoint = {};
            widget.api[name] = name;
            if(widget[name] === undefined)
                widget[name] = endpoint;
            if(name.charAt(name.length - 1) === "s"){
                name = name.substr(0, name.length - 1);
            }else{
                name += "s";
            }
            widget.api[name] = endpoint;
            if(widget[name] === undefined)
                widget[name] = endpoint;

        }
        return endpoint;
    };

    try {
        module.exports = widget;
    } catch (e) {
        //console.log("Unable to export the util library.");
        window.widget = widget;
    }
}).call(this);

//settings = widget.settings;
isString = widget.isString;
isArray = widget.isArray;
json = widget.json;
unjson = widget.unjson;
debug = widget.debug;
curry = widget.curry;
api = widget.api;