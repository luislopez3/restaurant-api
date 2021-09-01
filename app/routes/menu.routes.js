const express = require("express");
const menuController = require("../controllers/menu.controllers");
const menusRouter = express.Router();

menusRouter.route("/").get(menuController.list);
menusRouter.route("/menus").get(menuController.fullList);

module.exports = menusRouter; 
