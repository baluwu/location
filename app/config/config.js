/**
 * 主配置文件
 * @authors AndyLau (i@windyland.com)
 * @date    2016-03-08 17:27:24
 * @version V1.0.1
 */
"use strict";
var m = {
	// 路径相关配置，相对于根目录
	path:{
		_root:process.cwd()+'/',
		app:'app/',
		core:'app/core/',
		bin:'bin/',
		config:'app/config/',
		lib:'app/lib/',
		controllers:'app/controllers/',
		models:'app/models/',
		data:'app/data/',
		static:'static/'
	},
	//redis数据库配置
	redis:{
		enable:true,
		addr:'10.173.85.238',
		port:6379,
		pwd:'GGFJJMLDHZ',
		db:'0',
		timeout:0
	}
}

module.exports = m;
