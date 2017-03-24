"use strict"

const request = require('request');

/**
 * Retrieve product prices
 * 
 * @return {Array} prices
 */
function getPrices() {

  var options = {
    uri: 'http://www.mocky.io/v2/58d42dd71000006c0ed7a6f4',
    method: 'GET',
    json: true
  }

  return new Promise((resolve, reject) => {
    request(options, (err, response, body) => {
      if (err) {
          return reject(err);
      }

      resolve(body);
    });
  });
}

/**
 * Retrive products
 * 
 * @return {Array} products
 */
async function getProducts() {
  return [{
    id: 1933885,
    name: "Smart TV LED 70\" Samsung 4K/Ultra HD 70KU6000"
  }, {
    id: 2165147,
    name: "Smartphone Motorola Moto G 4ª Geração Play DTV"
  }];
}

/**
 * Product handler: delivery products with current price
 * 
 * @param {hapi.Request} the request information
 * @param {hapi.Reply} the reply interface
 * 
 */
async function productHandler(req, reply) {

  let [products, prices] = await Promise.all(
    [getProducts(), getPrices()]
  ).catch(err => reply(err));
  
  let data = products.map(p => {
    let price = prices.find(pr => p.id == pr.id);
    return Object.assign(p, price);
  });

  reply(data);
};

module.exports = productHandler;