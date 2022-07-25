const env = process.env.NODE_ENV || 'development';
const knexfile = require('../knexfile');
const knex = require('knex')(knexfile[env]);

knex
  .raw('SELECT 1')
  .then(() => {
    console.log('[setup] postgreSQL connected');
  })
  .catch((e) => {
    console.log('[error] postgreSQL connection', e);
  });

module.exports = knex;
