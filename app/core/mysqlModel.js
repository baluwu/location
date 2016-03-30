/**
 * 连接MySql的数据库模型基类
 * @authors AndyLau (i@windyland.com)
 * @date    2016-03-23 14:26:34
 * @version V1.0.1
 */
"use strict";

let config = global.config,
	util = global.util,
	db = util.require.lib('mysql'),
	tables = util.require.config('tables');

//解析数组构建sql条件
let _filterSql = function(filters){
	if(!filters || !util.isObject(filters)) return '1';
	let where = [];
	for(let k in filters){
		let v = filters[k];
		k = k.replace(/(^[\s\']|[\s\']$)/,'');
		if(/\sin$/i.test(k)){//array search
			v = util.isArray(v)?v.map(function(it,i){return "'"+it+"'";}).join(','):v;
			v = '(' + v + ')';
		}else if(/\slike$/i.test(k)){// like search
			v = /(^\%|\%$)/.test(v) ? v : "%"+v+"%";
			v = '\'' + v  + '\'';
		}else{
			v = '= \'' + v  + '\'';
		}
		where.push(k + ' ' + v);
	}
	return where.length?where.join(' AND '):'1';
}

let methods = {
	query:function(g,sql){
		let ctl=this;
		ctl._last_query = sql;
		let p = new Promise(function(res,rej){
			db.query(g,sql,function(err,vars,fields){
				if(err){
					console.error('['+(new Date()).format('Y-m-d H:i:s')+'] MySql Query Error:',err);
					if(rej(err) !== false){
						//process.exit(500);
					}
				}else{
					res(vars);
				}
			});
		});
		return p;
	},
	last_query:function(){
		return this._last_query || '';
	},
	pquery:function(sql,cb){
		let ctl = this,
			bid = ctl.business_id,
			f = tables.fetchSql(sql);
		return ctl.query(f.g,f.sql);
	},
	getOne:function(filter,cols){
		let ctl = this;
		if(!util.isArray(filter) && ctl.idColumn){
			let _f = {};
			_f[ctl.idColumn + ''] = filter + '';
			filter = _f;
		}
		return ctl.getList(cols,filter,1,1).then(function(arr){return arr[0]||null;});
	},
	getList:function(cols,filter,page,pagesize,orderby){
		let ctl = this;
		cols = cols || '*';
		page = page === false ? false : (parseInt(page)||1);
		pagesize = parseInt(pagesize)||100;
		
		let sql = 'SELECT ' + cols + ' FROM ' + ctl.realTableName;
		if(filter){
			if(util.isObject(filter)){
				sql += ' WHERE ' + _filterSql(filter);
			}else if(util.isString(filter)){
				sql += ' WHERE ' + filter;
			}
		}
		if(orderby){
			sql += ' ORDER BY '+orderby;
		}
		if(page){
			sql += ' LIMIT ' + ((page-1)*pagesize) + ',' + pagesize;
		}
		return ctl.query(ctl.dbGrop,sql);
	},
	add:function(){

	},
	edit:function(eData,filter){
		if(util.isEmpty(eData)){
			return false;
		}
		let ctl = this,
			sql = 'UPDATE ' + ctl.realTableName ,
			ups = [];
		util.each(eData,function(k,v){
			if(/^i:/.test(v)){
				v = v.replace(/^i:/,'');
			}else{
				v = '\'' + v + '\'';
			}
			ups.push(k + ' = ' + v);
		});
		sql += ' SET ' + ups.join(',');
		if(filter){
			if(util.isObject(filter)){
				sql += ' WHERE ' + _filterSql(filter);
			}else if(util.isString(filter)){
				sql += ' WHERE ' + filter;
			}
		}
		return ctl.query(ctl.dbGrop,sql);
	}

};


let cls = function(conf){
	this.__construct(conf||{});
}
cls.prototype.__construct = function(conf){
	this._conf = {};
	this._methods = {};
	this.config(conf);
	this.define(methods);
}

cls.prototype.config = function(k,v){
	if(util.isObject(k)){
		for(let c in k){
			this._conf[c] = k[c];
		}
		return this;
	}else if(util.isString(k) && v !== undefined){
		this._conf[k] = v;
		return this;
	}else{
		return this._conf[k];
	}
}
cls.prototype.define = function(i,f){
	if(util.isObject(i)){
		for(let k in i){
			this._methods[k] = i[k];
		}
	}else{
		this._methods[i] = f;
	}
	return this;
}

cls.prototype.control = function(bid){
	let m = this,
		ctl = {
			business_id:bid,
			tableName:m.config('tableName')||'',
			idColumn:m.config('idColumn')||''
		},
		f = tables.fetchTable(ctl.tableName,bid);

		ctl.dbGroup = f.d;
		ctl.realTableName = f.t;

	for(let mk in m._methods){
		ctl[mk] = m._methods[mk];
	}
	return ctl;
}

module.exports = function(c){ return new cls(c);}