/**
 * 路由分发
 * @authors AndyLau (i@windyland.com)
 * @date    2016-03-09 14:47:19
 * @version V1.0.1
 */
"use strict";
let config = global.config,
	util = global.util,
	mw = util.require.core('middleware'),
	koa = require('koa'),
	fs = require('fs'),
	thunkify = require('thunkify'),
	co = require('co'),
	fsExists = function(f){//thunkify
		return function(cb){
			fs.exists(f,function(exists){
				cb(null,exists)
			});
		}
	};

//解析路径
let parseRoutes = function* (paths){
	paths = paths.replace(/(^\/|\/$)/,'');
	let segments = paths?paths.split('/'):[],
		basepath = util.path(config.path.controllers) + '/',
		dir = '',
		ctl = '',
		method = '',
		args = [],
		find = false;

	let _segs = segments.concat(['index']),
		f = '';

	for(let i = 0 ;i<_segs.length;i++){
		ctl = _segs[i]
		f = basepath + dir + ctl + '.js';

		let	fe = yield fsExists(f);
		//console.dir(i+':'+ctl+' => '+_segs[i+1]);
		if(fe){
			method = _segs[i+1]||'index';
			args = segments[i+2]?segments.slice(i+2):[];
			find = true;
			break;
		}else{
			dir += _segs[i] + '/';
		}
	}

	let ret = {
		segments:segments,
		dir:dir,
		file:f,
		controller:ctl,
		method:method,
		args:args,
		find:find
	}
	return ret;
}


var m = mw('router');
m.define({
	run:function(){
		let ctl = this,
			ctx = this.ctx,
			p = this.parsed;
		return function(cb){
			if(!p.find){
				//404
				ctl.ctx.output.show404();
				cb(null);
			}else{
				//console.dir(p);
				let controller = util.require.controller(p.dir + p.controller);
				controller.start({
					ctx:ctx,
					method:p.method,
					args:p.args,
					callback:function(b){ 
						if(b){

						}else{
							ctl.ctx.output.show404();
						}
						cb(null);
					}
				});
			}
		}
	}
});
m.init(function* (){
	let ctl = this;

	ctl.parsed = yield parseRoutes(ctl.ctx.path);

	yield ctl.run();

	return true;
});

module.exports = m;
