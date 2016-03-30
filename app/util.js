/**
 * 整合的常用工具模块
 * @authors AndyLau (i@windyland.com)
 * @date    2016-03-08 17:50:42
 * @version V1.0.1
 */
"use strict";
let config = global.config,
	ut = require('util');
var m  = {
	utils:{
		path:require('path')
	},
	//获得绝对路径,uri为相对于根目录的路径
	path:function(uri){
		return m.utils.path.resolve(config.path._root + uri);
	},
	//相对于根目录的require方式
	require:function(mod){
		return require(m.path(mod));
	},
	//遍历函数
	each:function(obj,cb){
		for(let k in obj){
			let r = cb(k,obj[k]);
			if(r===!1){
				return ;
				break;
			}
		}
	},
	isEmpty:function(a){
		if(m.isArray(a)) return a.length == 0 ? !0:!1;
		if(m.isObject(a)) {for(let b in a){ return !1;} return !0;}
		return !1;
	},
	timestamp:function(d){
		d = d? new Date(d):new Date();
		return d.getTime().toString();
	}
}
//require
m.require.core = function(p){return this(config.path.core + p);}
m.require.config = function(p){return this(config.path.config + p);}
m.require.controller = function(p){return this(config.path.controllers + p);}
m.require.data = function(p){return this(config.path.data + p);},
m.require.lib = function(p){return this(config.path.lib + p);}
m.require.model = function(p){return this(config.path.models + p);}

m.each(ut,function(k,v){
	m[k] = function(){ return ut[k].apply(ut,arguments);}
	return true;
});

module.exports = m;