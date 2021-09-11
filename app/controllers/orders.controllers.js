const ordersServices = require("../services/orders.services");

// Check for required ID in body object
function checkId(req, res, next) {
  const id = parseInt(req.params.id);
  const number = parseInt(id);
  if (isNaN(number)) {
    next("Not a number");
  }
  next();
}

// Get
async function list(req, res, next) {
  const db = req.app.get("db");
  const orders = await ordersServices.getOrders(db);
  res.json(orders);
}

// Get by ID
async function read(req, res, next) {
  const id = parseInt(req.params.id);
  const db = req.app.get("db");
  const found = await ordersServices.getOrder(db, id);
  if (!found) {
    return res.sendStatus(404);
  }
  res.json(found);
}

// Patch by ID
async function update(req, res, next) {
  const id = parseInt(req.params.id);
  const db = req.app.get("db");
  const { name, address, email, phone_number, status, total_price } = req.body;
  const order = {
    name,
    address,
    email,
    phone_number,
    status,
    total_price,
    ordered_at: new Date(),
  };
  try {
     await ordersServices.updateOrder(db, id, order);
     const updatedOrder = await ordersServices.getOrder(db, id)
     console.log(updatedOrder, "hello world", id)
    res.json(updatedOrder);
  }
  catch (err) {
    console.log(err)
    res.status(500)
    .send(err.message)
  }
  
}


module.exports = {
  list: [list],
  read: [checkId, read],
  update: [checkId, update],
};
