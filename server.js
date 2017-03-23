"use strict"

const
  Hapi = require('hapi'),
  request = require('request'),
  server = new Hapi.Server();

/**
 * Retrieve product prices
 * 
 * @return {Array} prices
 */
let getPrices = () => {

  var options = {
    uri: 'http://www.mocky.io/v2/58d42dd71000006c0ed7a6f4',
    method: 'GET',
    json: true
  }

  return new Promise((resolve, reject) => {
    request(options, (err, response, body) => {
      if(err){
        return reject(err);
      }

      resolve(body);
    });
  });
};

/**
 * Retrive products
 * 
 * @return {Array} products
 */
let getProducts = async () => {
  return [{
    id: 1933885,
    name: "Smart TV LED 70\" Samsung 4K/Ultra HD 70KU6000"
  }, {
    id: 2165147,
    name: "Smartphone Motorola Moto G 4ª Geração Play DTV"
  }];
};

/**
 * 
 * @param {hapi.Request} req 
 * @param {hapi.Reply} reply 
 */
let productHandle = async (req, reply) => {

  let [products, prices] = await Promise.all(
    [getProducts(), getPrices()]
  ).catch(err => reply(err));

  let data = products.map(p => {
    let price = prices.find(pr => p.id == pr.id);
    return Object.assign(p, price);
  });

  reply(data);
};

server.connection({
  host: '0.0.0.0',
  port: 8000
});

server.route({
  method: 'GET',
  path: '/products',
  handler: productHandle
});

module.exports = server