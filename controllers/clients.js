const pool = require('../dbinit.js');



//All clients list

const getClients = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connection as id........ ${connection.threadId}`)
        connection.query('SELECT * FROM clients', (err, rows) => {

            connection.release()//return the connection to pool
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })

    })

}


//Get One client by ID

const getOneClientById = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connection as id........ ${connection.threadId}`)
        connection.query('SELECT * from clients WHERE CLIENT_ID=?',[req.params.client_id], (err, rows)=>{

            connection.release()//return the connection to pool
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })

    })

}



//company Market list

const getCompanyMarket = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connection as id........ ${connection.threadId}`)
        connection.query('SELECT * FROM comarket', (err, rows) => {

            connection.release()//return the connection to pool
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })

    })

}

//company Type list

const getCompanyType = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connection as id ........${connection.threadId}`)
        connection.query('SELECT * FROM companytype', (err, rows) => {
            connection.release()
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })

}


//Get One Quote by ID

const getOneQuoteById = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connection as id........ ${connection.threadId}`)
        //connection.query('SELECT * from quotes WHERE QUOTECODE=?',[req.params.quote_id], (err, rows)=>{
        connection.query(
            'SELECT * FROM quotes RIGHT JOIN preconfirmation ON preconfirmation.PRECONFIRMATION_ID= quotes.PRECONFIRMATION_ID RIGHT JOIN clients ON preconfirmation.CLIENT_ID= clients.CLIENT_ID   WHERE quotes.QUOTECODE=?'
            ,[req.params.quote_id], (err, rows)=>{
        
            

            connection.release()//return the connection to pool
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })

    })

}



//Get Max Quote Reference of a quote

const getMaxQuoteRef = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connection as id........ ${connection.threadId}`)
        connection.query('SELECT max(QUOTE_REF) as MAX_QUOTE_REF FROM quotes', (err, rows)=>{

            connection.release()//return the connection to pool
            if (!err) {
                console.log("here is the max Quote Ref to be passed",rows)
                res.send(rows)
            } else {
                console.log(err)
            }
        })

    })

}







//create New Client

const createNewClient = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connection as id ${connection.threadId}`)
        const params = req.body
        //query(sqlString, callback)
        //connection.query('INSERT INTO clients (`CLIENT_ID`,`COMPANY_NAME`,`TYPECO_ID`,`COMARKET_ID`) VALUES (NULL,"TEST I",10,10)',(err,rows)=>{
        connection.query('INSERT INTO clients SET ?', params, (err, rows) => {
            //console.log("1 record inserted, ID: " + rows.insertId);
            connection.release()
            if (!err) {

                console.log("1 record inserted, ID: " + rows.insertId);

                //res.send(rows.insertId)
                res.send(rows)


            } else {
                console.log("error coming from here....")
                console.log(err)
                res.status(500).send("no recorded")
            }
        })

    })
}



//create New Quotes

const createNewQuote = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connection as id ${connection.threadId}`)
        const params = req.body
        //query(sqlString, callback)
        //connection.query('INSERT INTO clients (`CLIENT_ID`,`COMPANY_NAME`,`TYPECO_ID`,`COMARKET_ID`) VALUES (NULL,"TEST I",10,10)',(err,rows)=>{
        connection.query('INSERT INTO quotes SET ?', params, (err, rows) => {
            //console.log("1 record inserted, ID: " + rows.insertId);
            connection.release()
            if (!err) {

                //console.log("1 record inserted, ID: " + rows.insertId);

                //res.send(rows.insertId)
                //res.send(rows)
                res.send('quote succesfully created')

            } else {
                console.log(err)
            }
        })

    })
}



module.exports = { 
    getClients, 
    getCompanyMarket, 
    createNewClient, 
    getCompanyType, 
    createNewQuote, 
    getOneClientById,
    getOneQuoteById,
    getMaxQuoteRef }