/**
 * 输出控制
 * @authors AndyLau (i@windyland.com)
 * @date    2016-03-09 16:31:30
 * @version V1.0.1
 */
"use strict";
let config = global.config,
	util = global.util,
	mw = util.require.core('middleware'),
	qs = require("querystring"),
	url = require("url"),
	co = require('co');

var m = mw('output');
	
	m.init(function* (){	
				let ctl = this;
				ctl.body_str = '';
				ctl._ended = false;
	});

	m.on('afterNext',function(){
		//console.log('fire event end');
		this.end();
	});
	
	//定义方法
	m.define({
		echo:function(str){
			//console.log('fire echo',str);
			this.body_str += str||'';
			return this;
		},
		jsonOut:function(result,msg,data){
			return this.echo(JSON.stringify({
				result:result?true:false,
				msg:msg||'',
				data:data||[]
			}));
		},
		end:function(){
			//console.log('fire end');
			if(!this._ended){
				this.ctx.body = this.body_str;
				this._ended = true;
			}
			return this;
		},
		showError:function(msg,code){
			this.ctx.response.status = code || 200;
			this.echo(msg);
			return this;
		},
		show404:function(){
			this.showError('Not found this page!',404);
		}
	});

module.exports = m;
