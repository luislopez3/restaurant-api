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

  it("should create a new order", function () {
    const newOrder = { 
        name,
        address,
        email,
        phone_number,
        user_id,
        total_price,
        ordered_at,
        status,
        payment_method };
    return chai
      .request(app)
      .post("/")
      .send(newOrder)
      .then((res) => {
        console.log(res.body);
        expect(res).to.have.status(201);
        expect(res.body.id).to.be.a("number");
        expect(res.body.name).to.equal(newOrder.name);
        expect(res.body.address).to.be.a("string");
        expect(res.body.email).to.be.a("string");
        expect(res.body.phone_number).to.be.a("number");
        expect(res.body.user_id).to.be.null;
        expect(res.body.total_price).to.be.a("number");
        expect(res.body.ordered_at).to.exist;
        expect(res.body.status).to.equal("active");
        expect(res.body.payment_method).to.be.null;
      });
  });

  
});
