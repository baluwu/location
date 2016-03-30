/**
 * 中间件基类
 * @authors AndyLau (i@windyland.com)
 * @date    2016-03-10 14:17:48
 * @version V1.0.1
 */
"use strict";
let util = require('util'),
	co = require('co');
var m = function(name){
	let mt = this;
	mt._name = name;
	mt.__construct();
}
//创建一个上下文对象 t: 中间件实例
let _create = function(t,ctx,next){
	let o = {ctx:ctx,_next:next};
	for(let mk in t._methods){
		o[mk] = t._methods[mk];
	}
	return o;
}

m.prototype.__construct = function(){
	//存取数据
	let mt = this;
	mt._initGen = null;
	mt._methods = {};//上下文成员方法
	mt._events = {};//上下文成员事件,
	mt.define({
		data:function(k,v){
			let ctl = this;
			if(!ctl._data) ctl._data = {};
			if(v === undefined){
				return ctl._data[k];
			}else if(v === null){
				delete ctl._data[k];
				return ctl;
			}else{
				ctl._data[k] = v;
				return ctl;
			}
		}
	});
}

m.prototype.callback = function(cb){
		let _t = this;
		if(cb&&util.isFunction(cb)){
			_t._callbackCb = cb;
			return _t;
		}else{
			if(_t._callbackCb){
				_t._callbackCb.call(_t);
			}
			let ret = function *(next){
				let ctl = _create(_t,this,next);
				if(_t._name) ctl.ctx[_t._name] = ctl;
				//初始化generator
				let toNext = true;
				if(_t._initGen){
					//console.log('into inited of '+_t._name);
					toNext = (yield *_t._initGen.apply(ctl)) === false?false:true;
					//console.log('leave inited of '+_t._name);
				}
				//进入下一个中间前的事件
				if(toNext){
					_t.triggerEvent(ctl,'beforeNext');
					//console.log(_t._name,'fire next');
					yield next;
					_t.triggerEvent(ctl,'afterNext');
					//console.log(_t._name,'after fire next');
				}
			}
			return ret;
		}
	};
m.prototype.init = function(gen){
	this._initGen = gen;
}
m.prototype.define = function(i,f){
	if(util.isObject(i)){
		for(let k in i){
			this._methods[k] = i[k];
		}
	}else{
		this._methods[i] = f;
	}
	return this;
}
m.prototype.on = function(name,f){
	if(util.isFunction(f)){
		this._events[name] = f;
	}
	return this;
}
m.prototype.triggerEvent = function(ctl,name,args){
	if(this._events[name]){
		let ret = this._events[name].apply(ctl,args||[]);
		return ret;
	}
	return;
}

module.exports = function(n){ return new m(n);};
