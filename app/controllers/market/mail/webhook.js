/**
 * webhook
 * @authors AndyLau (i@windyland.com)
 * @date    2016-03-21 11:26:19
 * @version V1.0.1
 */
"use strict";

let config = global.config,
	util = global.util,
	Controller = util.require.core('controller'),
	co = require('co'),
	conf = util.require.config('sohumail');

let sts = {
	'sendcloud' :	{v:0,n:'队列中'},
	'deliver'	:	{v:1,n:'已发送'},
	'open'		:	{v:2,n:'已阅读'},
	'unsubscribe':{v:3,n:'取消订阅'},
	'bounce'	:	{v:4,n:'软退信'},
	'report_spam':{v:5,n:'垃圾举报'},
	'invalid'	:	{v:6,n:'无效邮件'}
}
let logMod = util.require.model('market/mailLogModel');

let m = module.exports = Controller('webhook');

m.define({
	index:function(name){
		let ctl = this,
			evt = ctl.input.post('event'),
			mth = evt?('on' + evt.toFirstUpperCase()):'';
		if(mth && ctl[mth]){
			ctl[mth].call(ctl);
		}
	},
	//发送
	onDeliver:function(){
		let ctl = this,
			mod = logMod.control(),
			eid = ctl.input.post('emailId'),
			timestamp = (ctl.input.post('timestamp')||util.timestamp()).substr(0,10),
			eData = {
				status:sts.deliver.v,
				send_time:timestamp
			},
			filter = {email_id:eid};
		mod.edit(eData,filter)
			.then(function(v){
				ctl.output.echo('success');
				ctl.return();
			})
			.catch(function(err){
				ctl.output.showError('',500);
				ctl.return();
			});
	},
	//打开
	onOpen:function(){
		let ctl = this,
			mod = logMod.control(),
			eid = ctl.input.post('emailId'),
			timestamp = (ctl.input.post('timestamp')||util.timestamp()).substr(0,10),
			eData = {
				read_num:'i:read_num + 1',
				read_time:timestamp
			},
			filter = {email_id:eid};
		mod.edit(eData,filter)
			.then(function(v){
				ctl.output.echo(mod.last_query());
				ctl.return();
			})
			.catch(function(err){
				ctl.output.showError('',500);
				ctl.return();
			});
	},
	//点击
	onClick:function(){
		let ctl = this,
			mod = logMod.control(),
			eid = ctl.input.post('emailId'),
			timestamp = (ctl.input.post('timestamp')||util.timestamp()).substr(0,10),
			eData = {
				click_num:'i:click_num + 1',
				click_time:timestamp
			},
			filter = {email_id:eid};
		mod.edit(eData,filter)
			.then(function(v){
				ctl.output.echo('success');
				ctl.return();
			})
			.catch(function(err){
				ctl.output.showError('',500);
				ctl.return();
			});
	},
	//取消订阅
	onUnsubscribe:function(){
		let ctl = this,
			mod = logMod.control(),
			eid = ctl.input.post('emailId'),
			eData = {
				status:sts.unsubscribe.v
			},
			filter = {email_id:eid};
		mod.edit(eData,filter)
			.then(function(v){
				ctl.output.echo('success');
				ctl.return();
			})
			.catch(function(err){
				ctl.output.showError('',500);
				ctl.return();
			});
	},
	//软退信
	onBounce:function(){
		let ctl = this,
			mod = logMod.control(),
			eid = ctl.input.post('emailId'),
			eData = {
				status:sts.bounce.v
			},
			filter = {email_id:eid};
		mod.edit(eData,filter)
			.then(function(v){
				ctl.output.echo('success');
				ctl.return();
			})
			.catch(function(err){
				ctl.output.showError('',500);
				ctl.return();
			});
	},
	//垃圾举报
	onReport_spam:function(){
		let ctl = this,
			mod = logMod.control(),
			eid = ctl.input.post('emailId'),
			eData = {
				status:sts.report_spam.v
			},
			filter = {email_id:eid};
		mod.edit(eData,filter)
			.then(function(v){
				ctl.output.echo('success');
				ctl.return();
			})
			.catch(function(err){
				ctl.output.showError('',500);
				ctl.return();
			});
	},
	//无效邮件
	onInvalid:function(){
		let ctl = this,
			mod = logMod.control(),
			eid = ctl.input.post('emailId'),
			eData = {
				status:sts.invalid.v
			},
			filter = {email_id:eid};
		mod.edit(eData,filter)
			.then(function(v){
				ctl.output.echo('success');
				ctl.return();
			})
			.catch(function(err){
				ctl.output.showError('',500);
				ctl.return();
			});
	}

});
