/**
 * mysql连接类
 * @authors AndyLau (i@windyland.com)
 * @date    2016-03-23 15:21:16
 * @version V1.0.1
 */
"use strict";

let config = global.config,
	util = global.util,
	mysql = require('mysql'),
	conf = util.require.config('database');

let getPool = function(g){
	let m = getPool;
	m.pools = m.pools || {};
	if(!m.pools[g]){
		m.pools[g] = mysql.createPool(conf.mysql(g));
	}
	return m.pools[g];
}

let m = {
	query:function(g,sql,cb){
		let pool = getPool(g||'default');
		if(!pool) return false;
		pool.getConnection(function(err,conn){
	        if(err){ 
	            cb(err,null,null);  
	        }else{  
	            conn.query(sql,function(qerr,vals,fields){  
	                //释放连接  
	                conn.release();  
	                //事件驱动回调  
	                cb(qerr,vals,fields);  
	            });  
	        }  
	    });
	    return true;
	}
}

module.exports = m;