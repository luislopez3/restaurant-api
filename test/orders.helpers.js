const orderData = require("./orders.json")

const seedData = async (db) => {
    await db("orders").insert(orderData)
} 

const cleanData = async (db) => {
    await db("orders").truncate()
}

module.exports = {
    seedData,
    cleanData
}