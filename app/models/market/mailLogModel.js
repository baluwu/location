/**
 * 邮件发送日志模块
 * @authors AndyLau (i@windyland.com)
 * @date    2016-03-29 11:38:26
 * @version V1.0.1
 */
"use strict";

let config = global.config,
	util = global.util,
	mysqlModel = util.require.core('mysqlModel');

let m = module.exports = mysqlModel({
	tableName:'e_crm_mail_market_log',
	idColumn:'market_id'
});

