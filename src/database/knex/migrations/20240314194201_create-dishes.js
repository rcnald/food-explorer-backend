exports.up = function(knex) {
  return knex.schema.dropTableIfExists("dishes").createTable("dishes", table => {
    table.increments("id");
    table.string("name")
    table.string("description")
    table.string("avatar").nullable()
    table.integer("price")
    table.enum(
      "category", 
      ["drink","dessert","meal"], 
      {
        useNative: true, 
        enumName: "roles"
      }
    )
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("dishes")
};
