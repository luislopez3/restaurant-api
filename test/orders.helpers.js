

  const menuData = require("./menu.json")

const seedData = async (db) => {
    await db("menu").insert(menuData)
} 

const cleanData = async (db) => {
    await db("menu").truncate()
}

module.exports = {
    seedData,
    cleanData
}