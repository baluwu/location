/**
 * webhook
 * @authors AndyLau (i@windyland.com)
 * @date    2016-03-21 11:26:19
 * @version V1.0.1
 */
"use strict";

let config = global.config,
	util = global.util,
	Controller = util.require.core('controller');

let m = module.exports = Controller('webhook');

m.define({
	index:function(name){
		let ctl = this;
		ctl.output.echo('Hello my dear friend : '+(name||'world') + '!');
		ctl.return();
	},
	time:function(){
		let ctl = this,
			t = new Date().format('Y-m-d H:i:s');
		ctl.output.echo('This current time is : '+t);
		setTimeout(function(){
			ctl.return();
		}, 3000);
		
	}

});
