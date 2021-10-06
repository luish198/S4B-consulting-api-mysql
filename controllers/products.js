const pool = require('../dbinit.js');

const getProducts = (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connection as id........ ${connection.threadId}`)
        connection.query('SELECT * FROM products;', (err, rows) => {
            connection.release;

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
}

module.exports = { getProducts }