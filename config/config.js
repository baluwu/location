/**
 * 主配置文件
 * @authors AndyLau (i@windyland.com)
 * @date    2016-03-08 17:27:24
 * @version V1.0.1
 */
"use strict";
var m = {
	// 站点相关的配置
	site: {
		port: 9587,
		host:'nodejs.dserp.com'//默认的主机名
	},
	// 路径相关配置，相对于根目录
	path:{
		_root:process.cwd()+'/',
		app:'app/',
		core:'core/',
		bin:'bin/',
		config:'config/',
		controllers:'app/controllers/',
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
