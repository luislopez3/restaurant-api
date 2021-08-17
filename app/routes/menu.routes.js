const express = require("express");
const menuController = require("../controllers/menu.controllers");
const menusRouter = express.Router();

menusRouter.route("/menus").get(menuController.list);

module.exports = menusRouter;
