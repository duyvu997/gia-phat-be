/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('employees', (t) => {
    t.increments('id').primary().unsigned();
    t.string('username').unique().index();
    t.string('password');
    t.string('first_name');
    t.string('last_name');
    t.string('full_name');
    t.string('phone');
    t.date('birthday');
    t.date('joined_date');
    t.string('avatar');
    t.enum('role', ['admin', 'staff', 'none']).defaultTo('staff');
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
  return knex.schema.dropTable('employees');
};
