exports.up = function (knex) {
    return knex.schema.createTable("order_items", (table) => {
      table.increments("id");
      table.integer("order_id").references("orders.id");
      table.integer("item_id").references("menu_items.id");
      table.integer("quantity");
      table.integer("price");
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("order_items");
  };
