const pool = require('../dbinit.js');

const getProducts = (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connection as id........ ${connection.threadId}`)
        connection.query(
            'SELECT * FROM products LEFT JOIN standardprices ON products.PRODUCT_ID = standardprices.PRODUCT_ID WHERE standardprices.PUBSIZE_ID = 1 ORDER BY products.PRODUCT_ID ASC   ;'
            , (err, rows) => {
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