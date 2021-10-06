const pool = require('../dbinit');

const getUserSales = (req, res)=> {

    pool.getConnection((err, connection) =>{
        if(err) throw err
        console.log(`connection as id....... ${connection.threadId}`)
        connection.query('SELECT * FROM sales_test ORDER BY sales_test.SALES_DATE ASC;',(err,rows)=>{
            connection.release;
            if(!err){
                res.send(rows)
            }else{
                console.log(err)
            }
        })
    })

}

module.exports = {getUserSales}
