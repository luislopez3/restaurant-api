const { assert, expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require('../app')
const connection = require('../knexfile')['test'];
const menuData = require("./menu.json")
const { seedData, cleanData } = require("./menu.helpers")

chai.use(chaiHttp)

let db

describe("create", function () {
  before( () => {
    
    db = require('knex')(connection);
    app.set('db', db)
  })
  beforeEach ( () => {
    seedData(db)
  })
  afterEach( () => {
    cleanData(db)
  })

  it("should get the menu by type", function () {
    return chai.request(app)
    .get("/menu_items")
    .then((res) => {
      expect(res).to.have.status(200)
      expect(res.body[0].name).to.equal(menuData[0].name)
      expect(res.body[0].type).to.equal(menuData[0].type)
      expect(res.body[0].description).to.equal(menuData[0].description)
      expect(res.body[0].image_url).to.equal(menuData[0].image_url)
      expect(res.body[0].price).to.equal(menuData[0].price)
      expect(res.body[0].id).to.be.a('number')
      expect(res.body.length).to.equal(10)
    })
  });

  

  it("should get the full menu", function() {
    return chai.request(app)
    .get("/menu_items/menus")
    .then((res) => {
      expect(res).to.have.status(200)
      expect(res.body[0].name).to.equal(menuData[0].name)
      expect(res.body[0].type).to.equal(menuData[0].type)
      expect(res.body[0].description).to.equal(menuData[0].description)
      expect(res.body[0].image_url).to.equal(menuData[0].image_url)
      expect(res.body[0].price).to.equal(menuData[0].price)
      expect(res.body[0].id).to.be.a('number')
      expect(res.body).to.be.not.empty;
      expect(res.body.length).to.equal(20)
    })
  })

});