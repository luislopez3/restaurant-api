const orderItemsServices = require("../services/order_items.services");

// Check for required ID in body object
function checkId(req, res, next) {
  const id = parseInt(req.params.id);
  const number = parseInt(id);
  if (isNaN(number)) {
    next("Not a number");
  }
  next();
}

// Check for required Name in body object
function checkName(req, res, next) {
  if (!req.body.name) {
    next("Name is required in the body");
  }
  next();
}

// Get
async function list(req, res, next) {
  const db = req.app.get("db");
  const orderItems = await orderItemsServices.getOrderItems(db);
  res.json(orderItems);
}

// Post
async function create(req, res, next) {
  const db = req.app.get("db");
  const { id, name } = req.body;
  const orderItems = {
    id,
    order_id,
    item_id,
    quantity,
    price,
  };
  const newOrderItems = await orderItemsServices.createOrderItems(db, order);
  res.status(201).json(newOrderItems);
}

// Get by ID
async function read(req, res, next) {
  const id = parseInt(req.params.id);
  const db = req.app.get("db");
  const found = await orderItemsServices.getOrderItems(db, id);
  if (!found) {
    return res.sendStatus(404);
  }
  res.json(found);
}

// Patch by ID
async function update(req, res, next) {
  const id = parseInt(req.params.id);
  const db = req.app.get("db");
  const { name } = req.body;
  const orderItems = {
    id,
    order_id,
    item_id,
    quantity,
    price,
  };
  const updatedOrder = await orderItemsServices.updateOrderItems(db, id, order);
  res.json(updatedOrder);
}

// Delete by ID
async function deleteOrderItems(req, res, next) {
  const id = parseInt(req.params.id);
  const db = req.app.get("db");
  await orderItemsServices.deleteOrderItems(db, id);
  res.sendStatus(204);
}

module.exports = {
  list: [list],
  create: [checkName, create],
  read: [checkId, read],
  update: [checkId, checkName, update],
  delete: [checkId, deleteOrderItems],
};
