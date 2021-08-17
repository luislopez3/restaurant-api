const ordersServices = require('../services/orders.services')
  
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
    const db = req.app.get('db');
    const orders = await ordersServices.getOrders(db);
    res.json(orders);

  }
  
  // Post
  async function create(req, res, next) {
    const db = req.app.get('db')
    const { id, name } = req.body;
    const order = {
      id,
      address,
      phone_number,
      user_id,
      total_price,
      ordered_at,
      status,
      payment_method
    }
    const newOrder = await ordersServices.createOrder(db, order)
    res.status(201)
    .json(newOrder)
  }
  
  // Get by ID
  async function read(req, res, next) {
    const id = parseInt(req.params.id);
    const db = req.app.get('db');
    const found = await ordersServices.getOrder(db, id)
    if(!found) {
      return res.sendStatus(404)      
    }
    res.json(found);
  }
  
  // Patch by ID
  async function update(req, res, next) {
    const id = parseInt(req.params.id);
    const db = req.app.get('db');
    const { name } = req.body;
    const order = {
        id,
        address,
        phone_number,
        user_id,
        total_price,
        ordered_at,
        status,
        payment_method
      }
    const updatedOrder = await ordersServices.updateOrder(db, id, order)
    res.json(updatedOrder);
  }
  
  // Delete by ID
  async function deleteOrder(req, res, next) {
    const id = parseInt(req.params.id);
    const db = req.app.get('db')
    await ordersServices.deleteOrder(db, id);
    res.sendStatus(204);
  }

  
  module.exports = {
    list: [list],
    create: [checkName, create],
    read: [checkId, read],
    update: [checkId, checkName, update],
    delete: [checkId, deleteOrder],
  };