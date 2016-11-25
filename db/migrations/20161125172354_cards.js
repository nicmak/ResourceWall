
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('cards', function (table) {
      table.increments('id');
      table.string('url');
      table.string('title');
      table.string('notes');
      table
        .integer('user_id')
        .index()
        .references('id')
        .inTable('users');
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cards')

};
