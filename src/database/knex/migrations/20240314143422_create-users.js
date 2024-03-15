exports.up = function(knex) {
  return knex.schema.dropTableIfExists("users").createTable("users", table => {
    table.increments("id");
    table.string("name");
    table.string("email").unique();
    table.string("password");
    table.string("favorites_dishes_id");
    table.enum(
      "role", 
      ["admin","customer"], 
      {
        useNative: true, 
        enumName: "roles"
      }
    )
    .notNullable()
    .default("customer")
    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("users")
};
