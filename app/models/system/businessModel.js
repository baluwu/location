/**
 * 用户模块
 * @authors AndyLau (i@windyland.com)
 * @date    2016-03-24 09:50:55
 * @version V1.0.1
 */
"use strict";

let config = global.config,
	util = global.util,
	mysqlModel = util.require.core('mysqlModel');


let m = mysqlModel({
	tableName:'e_business',
	idColumn:'business_id'
});

module.exports = m;