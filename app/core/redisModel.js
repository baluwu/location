/**
 * redis数据库基类
 * @authors AndyLau (i@windyland.com)
 * @date    2016-03-21 15:37:51
 * @version V1.0.1
 */
"use strict";

let config = global.config,
	util = global.util,
	redis = require('redis');

let cls = function(){
	let m = this;
	m.__contruct();
}

cls.prototype.__contruct = function(){
	let m = this,
		conf = config.redis;
	m.client = redis.createClient(conf.port, conf.addr);
	m.client.auth(conf.pwd);
}



module.exports = function(n){ return new cls(n);};