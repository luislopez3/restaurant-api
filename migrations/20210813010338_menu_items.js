exports.up = function (knex) {
    return knex.schema.createTable("menu_items", (table) => {
      table.increments("id");
      table.string("name");
      table.string("type");
      table.string("description");
      table.string("image_url");
      table.integer("price");
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("menu_items");
  };
