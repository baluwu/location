/**
 * 基础文件，完成一些初始化的工作
 * @authors AndyLau (i@windyland.com)
 * @date    2016-03-21 14:51:27
 * @version V1.0.1
 */
"use strict";
let m = {};

//日期对象添加格式化方法
Date.prototype.format = function (fmt) {
	let to2 = function(s){
		s = s + '';
		return s.length == 1? ('0'+s):s;
	}
	let o = {
		"Y": this.getFullYear(),//年
		"m": to2(this.getMonth() + 1),//月
	    "d": to2(this.getDate()), //日 
	    "H": to2(this.getHours()), //小时 
	    "i": to2(this.getMinutes()), //分 
	    "s": to2(this.getSeconds()), //秒 
	};
	for(let i in o){
		fmt = fmt.replace(i,o[i]);
	}
	return fmt;
}







module.exports = m;
