const { assert, expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const connection = require("../knexfile")["test"];
const orderData = require("./orders.json");
const { seedData, cleanData } = require("./orders.helpers");

chai.use(chaiHttp);

let db;

describe("create", function () {
  before(() => {
    db = require("knex")(connection);
    app.set("db", db);
  });
  beforeEach(() => {
    seedData(db);
  });
  afterEach(() => {
    cleanData(db);
  });

  it.only("should update an order", function () {
    // const orderData = { 
      //  name: "Luis Lopez",
      //  address: "4405 Santo Domingo St.",
      //  email: "llopez1518@gmail.com",
      //  phone_number: "5055700694",
      //  total_price: 25.00,
      //  ordered_at: new Date(),
      //  status: "open",
    //  };
    return chai
      .request(app)
      .patch("/orders/1")
      .send(orderData)
      .then((res) => {
        console.log(res.body, orderData);
        expect(res).to.have.status(200);
        expect(res.body.name).to.equal(orderData.name);
        expect(res.body.address).to.equal(orderData.address);
        expect(res.body.phone_number).to.equal(orderData.phone_number);
        expect(res.body.email).to.equal(orderData.email);
        expect(res.body.total_price).to.equal(orderData.total_price);
        expect(res.body.ordered_at).to.equal(orderData.ordered_at);
        expect(res.body.status).to.equal(orderData.status);
        expect(res.body.address).to.be.a("string");
        expect(res.body.email).to.be.a("string");
        expect(res.body.phone_number).to.be.a("string");
        expect(res.body.total_price).to.be.a("number");
        expect(res.body.ordered_at).to.exist;
        expect(res.body.status).to.equal("active");
      });
  });

  it("should get all orders", function() {
    return chai.request(app)
    .get("/orders")
    .then((res) => {
      expect(res).to.have.status(200)
      expect(res.body).to.be.not.empty;
    })
  })

  it("should get order by ID", function() {
    return chai.request(app)
    .get("/orders/1")
    .then((res) => {
      expect(res).to.have.status(200)
      expect(res.body).to.be.not.empty;
    })
  })

  // /orders
  // /orders/1
  
});
