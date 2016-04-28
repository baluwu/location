/**
 * 系统邮件发送日志模块
 * @authors AndyLau (i@windyland.com)
 * @date    2016-04-28
 * @version V1.0.1
 */
"use strict";

let config = global.config,
	util = global.util,
	mysqlModel = util.require.core('mysqlModel');

let m = module.exports = mysqlModel({
	tableName:'e_crm_service_mail_log',
	idColumn:'log_id'
});

