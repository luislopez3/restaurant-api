exports.up = function (knex) {
    return knex.schema.createTable("orders", (table) => {
      table.increments("id");
      table.string("name");
      table.string("address");
      table.string("email");
      table.string("phone_number");
      table.integer("total_price");
      table.date("ordered_at");
      table.string("status");
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("orders");
  };
