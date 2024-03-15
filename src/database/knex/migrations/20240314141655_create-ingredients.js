exports.up = function(knex) {
  return knex.schema.dropTableIfExists("ingredients").createTable("ingredients", table => {
    table.increments("id");
    table.string("name")
    table.integer('dish_id')
      .references('id')
      .inTable('dishes')
      .onDelete('CASCADE')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("ingredients")
};
