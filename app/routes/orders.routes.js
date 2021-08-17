const express = require("express");
const ordersController = require("../controllers/orders.controllers");
const ordersRouter = express.Router();

ordersRouter
  .route("/")
  .get(ordersController.list)
  .post(ordersController.create);

ordersRouter
  .route("/:id")
  .get(ordersController.read)
  .patch(ordersController.update)
  .delete(ordersController.delete);

module.exports = ordersRouter;
