const MenuServices = {
  getFullMenu(db) {
    return db("menu_items").select("*")
    .orderBy("id", "asc");
  },
  getMenu(db, type) {
    return db("menu_items").select("*").where("type", type).orWhere("type", "Drinks")
    .orderBy("id", "asc");
  },
};

module.exports = MenuServices;
