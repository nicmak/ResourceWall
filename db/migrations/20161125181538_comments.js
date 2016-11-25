
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('comments', function (table) {
      table.increments('id');
      table.string('content');
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
      table.timestamp('timestamp');
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments')
};
