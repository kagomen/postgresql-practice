const Pool = require('pg').Pool

const pool = new Pool({
  user: 'fuka',
  host: 'localhost',
  database: 'users',
  port: 5432,
  password: process.env.PASSWORD,
})

module.exports = pool
