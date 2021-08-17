const OrdersServices = {
  getOrders(db) {
    return db("orders").select("*");
  },
  getOrder(db, id) {
    return db("orders").select("*").where("id", id).first();
  },
  createOrder(db, order) {
    return db("orders")
      .insert(order)
      .returning("*")
      .then((data) => data[0]);
  },
  updateOrder(db, id, order) {
    return db("orders").where("id", id).update(order);
  },
  deleteOrder(db, id) {
    return db("orders").where("id", id).del();
  },
};

module.exports = OrdersServices;
