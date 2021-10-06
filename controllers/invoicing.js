
const dotenv = require('dotenv');
dotenv.config()
const fs = require("fs")
const { jsPDF } = require("jspdf");
const AWS = require('aws-sdk');
const nodemailer = require('nodemailer');
const path = require("path");

const express = require('express');


const app = express();

//app.use(express.static('public'))
//app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join('./'+process.cwd(), 'public/docs','/a4.pdf')));

//app.get("/pdf", function (req, res) {

   console.log(path.join(__dirname, 'public/docs/'))

   const sentInvoiceAndEmailLink = (req,res)=>{

    


    //1.CREATE A PDF
    const doc = new jsPDF();
    doc.text("Order Confirmation - Invoice", 80, 10);
    doc.text("Confirmation Reference", 18, 80);
    doc.text("Company Name", 18, 85);
    doc.text("Main Contact", 18, 90);
    doc.text("Email", 18, 95);
    doc.text("Mobile", 18, 100);
    doc.text(JSON.stringify(req.body.Confirmation), 95, 80);
    //doc.addImage("https://ik.imagekit.io/bwcdq46tkc8/s4b-consulting/s4b-logo-long_eZmAw6pklB_.png?updatedAt=1631192744046&tr=w-1200,h-628,fo-auto", "png", 15, 20, 150, 40);
    const docsFolder = path.join(__dirname, 'public', 'docs')
    //doc.save(path.join('./'+process.cwd(), 'public/docs') + "/"+req.body.Confirmation + ".pdf");
    doc.save(path.join(docsFolder, req.body.Confirmation + ".pdf"));
     
   


    //1. CREATE A PDF  
    //const doc = new jsPDF();
    //doc.text("Hello world!", 10, 10);
    //doc.text("Hello world by LH!", 10, 20);
    //doc.save(process.cwd('/public') + "/a4.pdf");
    //doc.save(path.join('../'+__dirname, 'public/docs/') + "\a4.pdf");
    //doc.save(path.join('./'+process.cwd(), 'public/docs') + "/a4.pdf");
    //doc.save(path.join('./'+process.cwd(), 'public/docs') + "/"+req.body.Confirmation + ".pdf");



    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

  

    //fs.readFile(process.cwd() + "/a4.pdf", 'utf8', (err, data) => {
    //fs.readFile(path.join(__dirname, "public/docs") + "/a4.pdf", 'utf8', (err, data) => {
    //fs.readFile(path.join('./'+process.cwd(), "public/docs") + "/a4.pdf", 'utf8', (err, data) => {
    //fs.readFile(path.join('./'+process.cwd(), "public/docs") + "/" + req.body.Confirmation +".pdf", 'utf8', (err, data) => {
        fs.readFile(path.join(docsFolder, req.body.Confirmation +".pdf"), 'utf8', (err, data) => {



        if (err) {
            console.error(err)
            return
        }
        console.log(data)
        const params = {
            Bucket: 's4b-consulting', // pass your bucket name
            //Key: 'a4.pdf', // file will be saved as testBucket/contacts.csv
            Key: req.body.Confirmation +'.pdf', // file will be saved as testBucket/contacts.csv

            Body: data
        };

        s3.upload(params, function(s3Err, data) {
            if (s3Err) throw s3Err
            console.log(`File uploaded successfully at ${data.Location}`)
            //3. SEND S3 LINK VIA EMAIL
            //sendLinkEmail(data.Location, INSERT_RECIPIENT_EMAIL_HERE);
            SentAmazonEmail(data.Location, req.body)
            //res.send(data);
            res.send("pdf created and email sent !!")
        });


    })


};




const SentAmazonEmail = (link, data) => {
   //const SentAmazonEmail = (req, res) => {
    
    const fname = data.clientFirstName;

    const output = `
    <p></p>
    <p>Dear  ${fname}   </p>
    <p></p>
    <h2>Thank you for your Order with S4B Consulting !</h2>
    
    <p class="full">
    <img src="https://ik.imagekit.io/bwcdq46tkc8/s4b-consulting/s4b-logo-long_eZmAw6pklB_.png?updatedAt=1631192744046&tr=w-1200,h-628,fo-auto" alt="HTML5 Icon" width="350" height="60">
    </p>

    <p><p>${data.message}</p></p>
    <p class="full">

    <a href=${link}>
      <button>Download your invoice here</button>
    </a>
    <p class="full">
    <img src="https://ik.imagekit.io/bwcdq46tkc8/s4b-consulting/invoiceBar_yxKmWNfJm.png?updatedAt=1633509918647" alt="HTML5 Icon" width="380" height="60">
    </p>

    <p></p>
    <p></p>
    <p></p>
    <br>
    <p>Kind Regards</p>
    <p>S4B Consulting Admin Team</p>
    <p>Email: luis@s4b-consulting.de</p> 
    <p>Website: s4b-consulting.de</

       

    `;

    //nodemailer here ------------------------------

    //Step 1
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    //Step 2
    let mailOptions = {

        from: 'luis@s4b-consulting.de',
        //to: data.companyEmail,
        to: 'luish198108@gmail.com',

        //cc: 'luish199@hotmail.com',
        //bcc: 'ludis.info2@gmail.com',
        subject: 'Your Invoice -- By S4B consulting',
        text: 'Email info sent from AWS',
        attachments: [
            {   // use URL as an attachment
                //filename: 'a4.pdf',
                filename: data.Confirmation+".pdf",
                path: link
            }
        ],
        html: output
    };

    //Step 3
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('error happened', error)
        } else {
            console.log('email sent', info.messageId);
            console.log('preview URL:%s', nodemailer.getTestMessageUrl(info));

            //res.render('contact',{layout:false},{msg:'Email has been sent'})
            //res.render('contact', { layout: false, msg: 'Email Has been sent' });

        }
    });

}

    //end nodemailer --------------------------------

module.exports = {sentInvoiceAndEmailLink}


