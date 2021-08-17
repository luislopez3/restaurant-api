const OrderItemsServices = {
  getOrderItems(db) {
    return db("order_items").select("*");
  },
  getOrderItems(db, id) {
    return db("order_items").select("*").where("order_id", id).first();
  },
  createOrderItems(db, orderItems) {
    return db("order_items")
      .insert(orderItems)
      .returning("*")
      .then((data) => data[0]);
  },
  updateOrderItems(db, id, orderItems) {
    return db("order_items").where("id", id).update(orderItems);
  },
  deleteOrderItems(db, id) {
    return db("order_items").where("id", id).del();
  },
};

module.exports = OrderItemsServices;
