const express = require("express");
const ordersController = require("../controllers/orders.controllers");
const ordersRouter = express.Router();

ordersRouter
  .route("/")
  .get(ordersController.list)

ordersRouter
  .route("/:id")
  .get(ordersController.read)
  .patch(ordersController.update)

module.exports = ordersRouter;
