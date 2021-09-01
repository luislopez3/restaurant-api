const OrderItemsServices = {
  getOrderItems(db) {
    return db("order_items").select("*");
  },
  getOrderItems(db, id) {
    return db("order_items")
      .select(
        "order_items.*", "menu_items.name" ,"menu_items.image_url", "menu_items.type"
      )
      .join("menu_items", "menu_items.id", "order_items.item_id")
      .where("order_id", id);
  },
  createOrderItems(db, orderItems) {
    return db("order_items")
      .insert(orderItems)
      .returning("*")
      .then((data) => data[0]);
  },
  updateOrderItems(db, id, quantity) {
    return db("order_items").where("id", id).update({ quantity });
  },
  deleteOrderItems(db, id) {
    return db("order_items").where("id", id).del();
  },
};

module.exports = OrderItemsServices;
