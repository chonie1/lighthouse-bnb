const { Pool } = require('pg');
const dotenv = require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB,
});

module.exports = {
  query: (text, params) => {
    const start = Date.now();
    return pool.query(text, params)
      .then(res => {
        console.log('Executed query:', text, `\nDuration: ${(Date.now() - start)}ms`)
        return res;
      })
      .catch(err => {
        console.error('Failed query:', text, `\nDuration: ${(Date.now() - start)}ms`, err.stack)
        return err;
      })
  }
}