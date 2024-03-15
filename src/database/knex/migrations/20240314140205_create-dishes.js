exports.up = function(knex) {
  return knex.schema.dropTableIfExists("dishes").createTable("dishes", table => {
    table.increments("id");
    table.string("name")
    table.string("description")
    table.string("avatar")
    table.integer("price")
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("dishes")
};
