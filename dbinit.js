require('dotenv').config()
const mysql = require('mysql')


const pool = mysql.createPool({
    connectionLimit : 10,
    host     : process.env.HOST,
    port     : process.env.DB_PORT,
    user     : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE

});

module.exports = pool

// Comments .........................

/*module.exports = {
    query: (text, params) =>  pool.getConnection(text, params)
  }*/

  // To be checked with Fey to see if is possible to structure like in her SQL boilerplate project
  // Issue that it is done in PG and not MySQL
