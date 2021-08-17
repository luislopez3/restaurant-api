const express = require("express");
const orderItemsController = require("../controllers/order_items.controllers");
const orderItemsRouter = express.Router();

orderItemsRouter
  .route("/")
  .get(orderItemsController.list)
  .post(orderItemsController.create);

orderItemsRouter
  .route("/:id")
  .get(orderItemsController.read)
  .patch(orderItemsController.update)
  .delete(orderItemsController.delete);

module.exports = orderItemsRouter;
