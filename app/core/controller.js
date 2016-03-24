/**
 * 控制器基类
 * @authors AndyLau (i@windyland.com)
 * @date    2016-03-21 09:44:29
 * @version V1.0.1
 */
"use strict";

"use strict";
let util = require('util'),
	co = require('co');

let cls = function(name){
	this.__construct(name);
}

cls.prototype.__construct = function(name){
	let m = this;
	m.name = name;
	m._methods = {};
	m.define({
		//定义回调方法
		'return':function(){
			let ctl = this;
			ctl.params.callback(true);
		}
	})
}

cls.prototype._create = function(params){
	let m = this,
		ctl = {params:params},
		ctx = params.ctx;
	//引用输入输出控件
	ctl.input = ctx.input;
	ctl.output = ctx.output;
	//引用定义的方法
	for(let mk in m._methods){
		ctl[mk] = m._methods[mk];
	}

	return ctl;
}

cls.prototype.start = function(params){
	let m = this,
		ctl = m._create(params),
		ret = m._doMethod(ctl,params.method,params.args);
	if(!ret){
		//未定义该方法
		params.callback(false);
	}
}

cls.prototype._doMethod = function(ctl,name,args){
	let m = this;
	if (m._methods[name]) {
		m._methods[name].apply(ctl,args);
		return true;
	}
	return false;
}
//定义控制器的方法(action)
cls.prototype.define = function(i,f){
	if(util.isObject(i)){
		for(let k in i){
			this._methods[k] = i[k];
		}
	}else{
		this._methods[i] = f;
	}
	return this;
}

module.exports = function(n){ return new cls(n);};