/**
 * 输入控制
 * @authors AndyLau (i@windyland.com)
 * @date    2016-03-10 11:11:32
 * @version V1.0.1
 */
"use strict";
let config = global.config,
	util = global.util,
	mw = util.require.core('middleware'),
	qs = require("querystring"),
	url = require("url"),
	co = require('co');

var m = mw('input');

	m.init(function* (){	
				let ctl = this,
					req = ctl.ctx.req,//req是node的request, .request是koa的
					kreq = ctl.ctx.request,
					getData = qs.parse(kreq.querystring);

				//get数据
				ctl.data('getData',getData);
				ctl.data('postData',{});

				//post数据
				if(kreq.method == 'POST'){
					let pd = yield new Promise(function(resolve,reject){
						let _pd='';
						req.on('data',function(chunk){
								//console.log('goting post data of input');
								_pd += chunk;
						});	
						req.on('end',function(chunk){
								//console.log('goted post data of input');
								_pd = qs.parse(_pd)||{};
								//console.dir(_pd);
								resolve(_pd);
						});
					});
					ctl.data('postData',pd||{});
				}
	});

	//定义方法
	m.define({
		get:function(k){
			let d = k? this.data('getData')[k]:this.data('getData');
			return d === undefined? !1 : d;
		},
		post:function(k){
			let d = k? this.data('postData')[k]:this.data('postData');
			return d === undefined? !1 : d;
		}
	});

module.exports = m;