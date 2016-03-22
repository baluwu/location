/**
 * 服务器文件
 * @authors AndyLau (i@windyland.com)
 * @date    2016-03-08 17:26:37
 * @version V1.0.1
 */
"use strict";

let config = global.config = require('../config/config'),
    util = global.util = require('../config/util'),
    app = util.require(config.path.app + 'app'),
    http = require('http');

var server = http.createServer(app.callback());

server.listen(config.site.port);

server.on('error', function (error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof config.site.port === 'string' ? 'Pipe ' + config.site.port : 'Port ' + config.site.port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on('listening', function () {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('Listening on ' + bind);
});
