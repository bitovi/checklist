/*!
 * jQuery++ - 2.0.0
 * http://jquerypp.com
 * Copyright (c) 2015 Bitovi
 * Mon, 11 May 2015 10:03:45 GMT
 * Licensed MIT

 * Includes: jquerypp/dom/form_params/form_params
 * Download from: http://bitbuilder.herokuapp.com/jquerypp.custom.js?plugins=jquerypp%2Fdom%2Fform_params%2Fform_params
 */
/*[global-shim-start]*/
(function (exports, global){
	var origDefine = global.define;

	var get = function(name){
		var parts = name.split("."),
			cur = global,
			i;
		for(i = 0 ; i < parts.length; i++){
			if(!cur) {
				break;
			}
			cur = cur[parts[i]];
		}
		return cur;
	};
	var modules = (global.define && global.define.modules) ||
		(global._define && global._define.modules) || {};
	var ourDefine = global.define = function(moduleName, deps, callback){
		var module;
		if(typeof deps === "function") {
			callback = deps;
			deps = [];
		}
		var args = [],
			i;
		for(i =0; i < deps.length; i++) {
			args.push( exports[deps[i]] ? get(exports[deps[i]]) : ( modules[deps[i]] || get(deps[i]) )  );
		}
		// CJS has no dependencies but 3 callback arguments
		if(!deps.length && callback.length) {
			module = { exports: {} };
			var require = function(name) {
				return exports[name] ? get(exports[name]) : modules[name];
			};
			args.push(require, module.exports, module);
		}
		// Babel uses only the exports objet
		else if(!args[0] && deps[0] === "exports") {
			module = { exports: {} };
			args[0] = module.exports;
		}

		global.define = origDefine;
		var result = callback ? callback.apply(null, args) : undefined;
		global.define = ourDefine;

		// Favor CJS module.exports over the return value
		modules[moduleName] = module && module.exports ? module.exports : result;
	};
	global.define.orig = origDefine;
	global.define.modules = modules;
	global.define.amd = true;
	global.System = {
		define: function(__name, __code){
			global.define = origDefine;
			eval("(function() { " + __code + " \n }).call(global);");
			global.define = ourDefine;
		},
		orig: global.System
	};
})({"jquery":"jQuery","zepto":"Zepto"},window)
/*jquerypp@2.0.0#dom/form_params/form_params*/
define('jquerypp/dom/form_params/form_params', ['jquery'], function ($) {
    var keyBreaker = /[^\[\]]+/g, convertValue = function (value) {
            if ($.isNumeric(value)) {
                return parseFloat(value);
            } else if (value === 'true') {
                return true;
            } else if (value === 'false') {
                return false;
            } else if (value === '' || value === null) {
                return undefined;
            }
            return value;
        }, nestData = function (elem, type, data, parts, value, seen, fullName) {
            var name = parts.shift();
            fullName = fullName ? fullName + '.' + name : name;
            if (parts.length) {
                if (!data[name]) {
                    data[name] = {};
                }
                nestData(elem, type, data[name], parts, value, seen, fullName);
            } else {
                if (fullName in seen && type != 'radio' && !$.isArray(data[name])) {
                    if (name in data) {
                        data[name] = [data[name]];
                    } else {
                        data[name] = [];
                    }
                } else {
                    seen[fullName] = true;
                }
                if ((type == 'radio' || type == 'checkbox') && !elem.is(':checked')) {
                    return;
                }
                if (!data[name]) {
                    data[name] = value;
                } else {
                    data[name].push(value);
                }
            }
        };
    $.fn.extend({
        formParams: function (params) {
            var convert;
            if (!!params === params) {
                convert = params;
                params = null;
            }
            if (params) {
                return this.setParams(params);
            } else {
                return this.getParams(convert);
            }
        },
        setParams: function (params) {
            this.find('[name]').each(function () {
                var $this = $(this), value = params[$this.attr('name')];
                if (value !== undefined) {
                    if ($this.is(':radio')) {
                        if ($this.val() == value) {
                            $this.attr('checked', true);
                        }
                    } else if ($this.is(':checkbox')) {
                        value = $.isArray(value) ? value : [value];
                        if ($.inArray($this.val(), value) > -1) {
                            $this.attr('checked', true);
                        }
                    } else {
                        $this.val(value);
                    }
                }
            });
        },
        getParams: function (convert) {
            var data = {}, seen = {}, current;
            this.find('[name]:not(:disabled)').each(function () {
                var $this = $(this), type = $this.attr('type'), name = $this.attr('name'), value = $this.val(), parts;
                if (type == 'submit' || !name) {
                    return;
                }
                parts = name.match(keyBreaker);
                if (!parts.length) {
                    parts = [name];
                }
                if (convert) {
                    value = convertValue(value);
                }
                nestData($this, type, data, parts, value, seen);
            });
            debugger;
            for(var key in data){
                if(!data[key].length){
                    delete data[key];
                }
            }
            return data;
        }
    });
    return $;
});
/*[global-shim-end]*/
(function (){
	window._define = window.define;
	window.define = window.define.orig;
	window.System = window.System.orig;
})();