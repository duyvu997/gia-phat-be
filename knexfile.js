/* eslint-disable n/no-path-concat */
'use strict';
const path = require('path');

require('dotenv').config({
  path: path.join(
    __dirname,
    process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'
  ),
});

const baseConfig = {
  client: 'pg',
  migrations: {
    tableName: 'knex_migrations',
    directory: `${__dirname}/db/migrations`,
  },
  seeds: {
    directory: `${__dirname}/db/seeds`,
  },
  pool: {
    min: 2,
    max: 10,
  },
};

module.exports = {
  development: {
    ...baseConfig,
    connection: {
      database: process.env.DATABASE_NAME || 'my_db',
      user: process.env.DB_USERNAME || 'username-dev',
      password: process.env.DB_PASSWORD || 'password',
    },
  },
  staging: {
    ...baseConfig,
    connection: {
      database: process.env.DATABASE_NAME || 'my_db',
      user: process.env.DB_USERNAME || 'username-stag',
      password: process.env.DB_PASSWORD || 'password',
    },
  },
  production: {
    ...baseConfig,
    connection: {
      database: process.env.DATABASE_NAME || 'my_db',
      user: process.env.DB_USERNAME || 'username-prod',
      password: process.env.DB_PASSWORD || 'password',
    },
  },
  heroku: {
    ...baseConfig,
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
  },
};
