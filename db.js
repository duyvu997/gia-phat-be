const Pool = require('pg').Pool;

const isProduction = process.env.NODE_ENV === 'production';

const poolConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
};
const pool = new Pool(poolConfig);

module.exports = pool;
