const
  should = require("should"),
  server = require('../server');

describe("Products", () => {

  let reqOpts = {
    method: 'GET',
    url: '/products'
  };

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
      let found = res.result.find((p) =>p.name == name);
      
      should(found).be.ok();
      should(name).be.equal(found.name);
      
      done();
    });
    
  });

});