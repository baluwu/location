/**
 * APP
 * @authors AndyLau (i@windyland.com)
 * @date    2016-03-09
 * @version V1.0.1
 */
"use strict";

let config = global.config = require('./config/config'),
    util = global.util = require('./util'),
    koa = require('koa'),
    app = koa(),
    co = require('co'),
    qs = require("querystring"),
    common = util.require.core('common');

module.exports = app;

  // console.dir('a');
  // let p = new Promise(function(resolve,reject){
  //     setTimeout(function(){
  //       resolve(1);
  //       console.dir('b');
  //     }, 3000);
  //     console.dir('c');
  // });
  // setTimeout(function(){
  //   p.then(function(){
  //     console.dir('e');
  //   });
  // }, 10000);
  

  // console.dir('d');


  //输入控制
  app.use(util.require.core('input').callback());
 
  //输出控制
  app.use(util.require.core('output').callback());

  //路由控制
  app.use(util.require.core('router').callback());
return;
  app.use(function *(n){
    var pData = this.input.post();
    pData.out = 'out';
    console.log('/********************************************/');
    this.output.jsonOut(pData);
    //console.log('tohere:',pData,this.output.body_str,this.body);
    yield n;
  });
return;

  app.use(function *(next){
    console.dir('here');
    var pData = this.input.post();
    console.dir(pData);
    yield next;
  });
  app.use(function *(){
    this.body = (this.body||'')+'end';
  });
  app.on('error', function(err){
    log.error('server error', err);
  });

