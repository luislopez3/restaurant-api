const MenuServices = {
  getMenu(db, type) {
    return db("menu_items").select("*").where("type", type).first();
  },
};
module.exports = MenuServices;
