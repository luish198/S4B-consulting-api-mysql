const pool = require('../dbinit.js');

const getProjects = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connection as id........ ${connection.threadId}`)
            connection.query(
                'SELECT * FROM projects RIGHT JOIN clubs ON projects.CLUB_ID=clubs.CLUB_ID ORDER BY clubs.CLUB_NAME ASC;'
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


const getOneProjectById = (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connection as id........ ${connection.threadId}`)
        connection.query(
            'SELECT * FROM projects RIGHT JOIN clubs ON projects.CLUB_ID=clubs.CLUB_ID WHERE PROJECT_ID =?'
            ,[req.params.project_id], (err, rows)=>{
            connection.release;

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
}




module.exports= {getProjects, getOneProjectById}
