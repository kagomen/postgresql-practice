require('dotenv').config()
const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.USER_NAME,
  host: 'localhost',
  database: 'users',
  port: 5432,
  password: process.env.PASSWORD,
})

module.exports = pool
