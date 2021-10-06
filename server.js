require('dotenv').config()
const express=require('express');
const cors = require('cors');
const path = require("path");


// requirements for the email Template=========================
const exphbs = require('express-handlebars');
//const path = require('path');
//end requirements for the email Template =====================


const app = express();

app.use(cors());

app.use(express.urlencoded({extended: true}))
app.use(express.json())


const clientsRouter = require('./routes/clients')
app.use('/clients', clientsRouter)

const projectsRouter = require('./routes/projects')
app.use('/projects', projectsRouter)

const productsRouter = require('./routes/products')
app.use('/products', productsRouter)

const emailServerRouter = require('./routes/emailServer')
app.use('/sent-email', emailServerRouter)

const emailInvoicingRouter = require('./routes/invoicing')
app.use('/sent-invoice-email', emailInvoicingRouter)

const ordersRouter = require('./routes/orders')
//app.use(express.static(path.join(__dirname + "../public")));
app.use('/orders', ordersRouter)

//Test sales for graph
const usersRouter = require('./routes/users')
app.use('/users', usersRouter)
//end Test Sales for graph




app.get('/',(req, res)=>{
    res.status(200).send("Mini-erp backend working ok !")
})




//email test ==============================================================
app.engine('handlebars', exphbs());
app.set('view engine','handlebars');
//static folder
app.use('/public', express.static(path.join(__dirname, 'public')));
//end email test ============================================================



app.listen(process.env.PORT || 8080, ()=>{console.log(`Server runing ok on Port ${process.env.PORT}`)})
//app.listen(process.env.PORT , ()=>{console.log(`Server runing ok on Port ${process.env.PORT}`)})