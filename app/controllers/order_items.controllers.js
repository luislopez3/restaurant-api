const orderItemsServices = require("../services/order_items.services");
const OrdersServices = require("../services/orders.services");

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
  const orderItems = await orderItemsServices.getOrderItems(db);
  res.json(orderItems);
}

// Post
async function create(req, res, next) {
  const db = req.app.get("db");
  let { id, order_id, quantity = 1, price } = req.body;
  if (!order_id) {
   const order = await OrdersServices.createOrder(db, {status: "open"})
    order_id = order.id
  }
  const orderItem = {
    order_id,
    item_id: id,
    quantity,
    price,
  };
  const newOrderItems = await orderItemsServices.createOrderItems(db, orderItem);
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
  const { quantity } = req.body;
  const updatedOrder = await orderItemsServices.updateOrderItems(db, id, quantity);
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
  create: [create],
  read: [checkId, read],
  update: [checkId, update],
  delete: [checkId, deleteOrderItems],
};
