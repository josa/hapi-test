"use strict"

const
  Hapi = require('hapi'),
  server = new Hapi.Server(),
  productHandler = require("./lib/productHandler.js");

server.connection({
  host: '0.0.0.0',
  port: 8000
});

server.route({
  method: 'GET',
  path: '/products',
  handler: productHandler
});

module.exports = server;