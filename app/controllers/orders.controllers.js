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

// Post
async function create(req, res, next) {
  const db = req.app.get("db");
  const { id, name } = req.body;
  const order = {
    id,
    address,
    phone_number,
    user_id,
    total_price,
    ordered_at,
    status,
    payment_method,
  };
  const newOrder = await ordersServices.createOrder(db, order);
  res.status(201).json(newOrder);
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
  const { name, address, email, phone_number, status, total_price, payment_method } = req.body;
  const order = {
    name,
    address,
    email,
    phone_number,
    status,
    total_price,
    ordered_at: new Date(),
    payment_method,
  };
  const updatedOrder = await ordersServices.updateOrder(db, id, order);
  res.json(updatedOrder);
}


module.exports = {
  list: [list],
  create: [create],
  read: [checkId, read],
  update: [checkId, update],
};
