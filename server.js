"use strict"

const
  Hapi = require('hapi'),
  server = new Hapi.Server();

let getProduct = (req, reply) => {
  reply([{
    "id": 1933885,
    "name": "Smart TV LED 70\" Samsung 4K/Ultra HD 70KU6000"
  }, {
    "id": 2165147,
    "name": "Smartphone Motorola Moto G 4ª Geração Play DTV"
  }]);
}

server.connection({ 
    host: '0.0.0.0', 
    port: 8000 
});

server.route({
  method: 'GET',
  path: '/products',
  handler: getProduct
});

module.exports = server