/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('projects', (t) => {
    t.increments('id').primary().unsigned();
    t.string('name').unique().index();
    t.string('location');
    t.string('investor');
    t.date('start_date');
    t.date('end_date');
    t.string('duration_in_days');
    t.string('budget');
    t.specificType('staffs', 'text ARRAY');
    t.specificType('supplies', 'jsonb ARRAY');
    t.string('phases');
    t.enum('status', ['pending', 'doing', 'done']).defaultTo('pending');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.string('created_by');
    t.timestamp('updated_at').defaultTo(knex.fn.now());
    t.string('updated_by');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema.dropTable('projects');
};
