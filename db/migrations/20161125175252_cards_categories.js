
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('cards_categories', function (table) {
      table.increments('id');
      table
      .integer('card_id')
      .index()
      .references('id')
      .inTable('cards');
      table
      .integer('category_id')
      .index()
      .references('id')
      .inTable('categories');
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cards_categories')

};
