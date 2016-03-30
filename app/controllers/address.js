/**
 * 省市区地址接口
 * @authors AndyLau (i@windyland.com)
 * @date    2016-03-21 15:29:40
 * @version V1.0.1
 */
"use strict";

let config = global.config,
	util = global.util,
	Controller = util.require.core('controller');

let m = module.exports = Controller('address'),
	data = util.require.data('areas.min');


//搜索市
let getCitys = function(proId){
	if(!proId) return false;
	if(!data.p[proId]) return false;

	let ret = {};
	for(let id in data.c){
		let city = data.c[id];
		if(city.p == proId){
			ret[id] = city.n + '';
		}
	}
	return ret;
}
let getCitysCn = function(proName){
	if(!proName) return false;
	let proId = null;
	for(let id in data.p){
		if(data.p[id].n === proName){
			proId = id;
			break;
		}
	}
	let ret = proId?getCitys(proId):false;
	return ret;
}


//搜索区县
let getAreas = function(cityId){
	if(!cityId) return false;
	if(!data.c[cityId]) return false;

	let ret = {};
	for(let id in data.a){
		let area = data.a[id];
		if(area.p == cityId){
			ret[id] = area.n + '';
		}
	}
	return ret;
}

let getAreasCn = function(cityName){
	if(!cityName) return false;
	let cityId = null;
	for(let id in data.c){
		if(data.c[id].n === cityName){
			cityId = id;
			break;
		}
	}
	let ret = cityId?getAreas(cityId):false;
	return ret;
}


m.define({
	index:function(){

	},
	getProvinces:function(){
		let ret = {};
		for(let id in data.p){
			ret[id] = data.p[id].n;
		}
		this.output.jsonOut(true,'',ret);
		this.return();
	},
	getCitys:function(){
		let proId = this.input.get('provinceId'),
			proName = this.input.get('provinceName'),
			citys = proId?getCitys(proId):getCitysCn(proName);

		if(!citys){
			this.output.jsonOut(false,'No such province');
		}else{
			this.output.jsonOut(true,'',citys);
		}

		this.return();
	},
	getAreas:function(){
		let cityId = this.input.get('cityId'),
			cityName = this.input.get('cityName'),
			areas = cityId?getAreas(cityId):getAreasCn(cityName);

		if(!areas){
			this.output.jsonOut(false,'No such city');
		}else{
			this.output.jsonOut(true,'',areas);
		}
		this.return();
	}
})