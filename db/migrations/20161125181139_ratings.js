
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('ratings', function (table) {
      table.increments('id');
      table.integer('rating');
      table
        .integer('user_id')
        .index()
        .references('id')
        .inTable('users')
      table
        .integer('card_id')
        .index()
        .references('id')
        .inTable('cards');
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('ratings')
};
