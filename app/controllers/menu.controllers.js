const menuServices = require("../services/menu.services");

// Get menu by type
async function list(req, res, next) {
  const type = req.query.type;
  const db = req.app.get("db");
  const found = await menuServices.getMenu(db, type);
  if (!found) {
    return res.sendStatus(404);
  }
  res.json(found);
}

// Get full menu
async function fullList(req, res, next) {
  const db = req.app.get("db");
  const found = await menuServices.getFullMenu(db);
  if (!found) {
    return res.sendStatus(404);
  }
  res.json(found);
}

module.exports = { list: [list], fullList: [fullList] };
