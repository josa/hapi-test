const
  should = require("should"),
  server = require('../server'),
  nock = require('nock');

describe("Products", () => {

  let reqOpts = {
    method: 'GET',
    url: '/products'
  };

  beforeEach(() => {
    nock('http://www.mocky.io')
      .get('/v2/58d42dd71000006c0ed7a6f4')
      .reply(200, JSON.stringify([
        {
          "id": 1933885,
          "price": 2600
        },
        {
          "id": 2165147,
          "price": 900
        }
      ]));
  });

  it("GET /products should return two products", (done) => {

    server.inject(reqOpts, (res) => {
      should(200).be.equal(res.statusCode);
      should(2).be.equal(res.result.length);

      done();
    });

  });

  it("GET /product response should have product: \"Smart TV LED 70\"\"", (done) => {

    server.inject(reqOpts, (res) => {
      let name = "Smart TV LED 70\" Samsung 4K/Ultra HD 70KU6000";
      let found = res.result.find((p) => p.name == name);

      should(found).be.ok();
      should(name).be.equal(found.name);

      done();
    });

  });

});