
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('categories', function (table) {
      table.increments('id');
      table.string('category_name');
      table.string('card_id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('categories')

};
