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
    .get("/restaurant")
    .then((res) => {
      console.log(res.body)
      expect(res).to.have.status(200)
      const menus = res.body.map((menu) => {
        return { id: menu_items.id[0, 1] }
      })
      expect(menus).to.deep.equal(menuData)
      expect(res.body[0].name).to.equal(menuData[0].name)
      expect(res.body[0].id).to.be.a('number')
    })
  });

  

  it("should delete by ID", function() {
    return chai.request(app)
    .delete("/actors/2")
    .then((res) => {
      expect(res).to.have.status(204)
      expect(res.body).to.be.empty
    })
  })

});