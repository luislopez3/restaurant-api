const menuServices = require("../services/menu.services");

// Get menu items by type
async function list(req, res, next) {
  const db = req.app.get("db");
  const menu = await menuServices.getMenu(db);
  res.json(menu);
}

module.exports = { list: [list] };
