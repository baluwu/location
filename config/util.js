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
			if(r===false){
				return ;
				break;
			}
		}
	}
}
//require
m.require.core = function(p){return this(config.path.core + p);}
m.require.config = function(p){return this(config.path.config + p);}
m.require.controller = function(p){return this(config.path.controllers + p);}
m.require.data = function(p){return this(config.path.data + p);}

m.each(ut,function(k,v){
	m[k] = function(){ return ut[k].apply(ut,arguments);}
	return true;
});

module.exports = m;