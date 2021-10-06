
const pool = require('../dbinit')


//Get Max Confirmation Reference of the table confirmations

const getMaxConfoRef = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connection as id........ ${connection.threadId}`)
        connection.query('SELECT max(CONFIRMATION_REFERENCE) as MAX_CONFIRMATION_REFERENCE FROM confirmation', (err, rows)=>{

            connection.release()//return the connection to pool
            if (!err) {
                console.log("here is the max Confirmation Ref to be passed",rows)
                res.send(rows)
            } else {
                console.log(err)
            }
        })

    })

}






//create New Project

const createNewPreconfirmation = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connection as id ${connection.threadId}`)
        const params = req.body
    
        connection.query('INSERT INTO preconfirmation SET ?', params, (err, rows) => {
            //console.log("1 record inserted, ID: " + rows.insertId);
            connection.release()
            if (!err) {

                console.log("1 Preconfirmation record inserted with, ID: " + rows.insertId);

                //res.send(rows.insertId)
                res.send(rows)
                //res.send('quote succesfully created')

            } else {
                console.log(err)
            }
        })

    })
}




//create New Confirmation

const createNewConfirmation = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connection as id ${connection.threadId}`)
        const params = req.body
    
        connection.query('INSERT INTO confirmation SET ?', params, (err, rows) => {
            //console.log("1 record inserted, ID: " + rows.insertId);
            connection.release()
            if (!err) {

                console.log("1 Preconfirmation record inserted with, ID: " + rows.insertId);

                //res.send(rows.insertId)
                res.send(rows)
                //res.send('quote succesfully created')

            } else {
                console.log("error coming from here....")
                console.log(err)
                res.status(500).send("no recorded")
            }
        })

    })
}





module.exports = {createNewPreconfirmation, createNewConfirmation, getMaxConfoRef}