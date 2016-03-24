/**
 * 数据库配置
 * @authors AndyLau (i@windyland.com)
 * @date    2016-03-23 15:25:20
 * @version V1.0.1
 */
"use strict";

let c = {
	mysql:{
		default:{
			host:'192.168.1.223',
			port:3306,
			user:'diansan',
			password:'123456',
			database:'diansan_erp',
			charset:'utf8',
			supportBigNumbers:true,
			bigNumberStrings:true,
			//connectTimeout:10000,
			connectionLimit:199,//最大连接数限制
			dbprefix:'e_'			
		},
		other0:{
			host:'192.168.1.220',
			database:'other0'
		},
		other1:{
			host:'192.168.1.220',
			database:'other1'
		},
		other2:{
			host:'192.168.1.220',
			database:'order2'
		},
		other3:{
			host:'192.168.1.220',
			database:'order3'
		},
		other4:{
			host:'192.168.1.220',
			database:'order4'
		},
		other5:{
			host:'192.168.1.220',
			database:'order5'
		},
		other6:{
			host:'192.168.1.220',
			database:'order6'
		},
		other7:{
			host:'192.168.1.220',
			database:'order7'
		},
		other8:{
			host:'192.168.1.220',
			database:'order8'
		},
		other9:{
			host:'192.168.1.220',
			database:'order9'
		}
	},
	redis:{

	}
};
//for mysql config extends
for(let g in c.mysql){
	if(g !== 'default'){
		for(let k in c.mysql['default']){
			c.mysql[g][k] = c.mysql[g][k] !== undefined ? c.mysql[g][k] : c.mysql['default'][k] + ''; 
		}
	}
}

let m = module.exports = {
	mysql:function(g){
		return c.mysql[g] || {};
	},
	redis:function(){

	}
};
