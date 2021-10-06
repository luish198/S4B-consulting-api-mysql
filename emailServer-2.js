require('dotenv').config()
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars');


    //Step 1
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    transporter.use('complie',hbs({
        viewEngine: 'express-handlebars',
        viewPath: './views/'
    }))

    //Step 2
    let mailOptions = {
        
        from: 'luis@s4b-consulting.de',
        to: 'luish198108@gmail.com',
        cc: 'luish199@hotmail.com',
        bcc: 'ludis.info2@gmail.com',
        subject: 'testing email server by LH',
        text: 'Email with template',
        template: 'contact',
        context:{
            name: 'luis h'
        }
    };

    //Step 3
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log('error happened', err)
        } else {
            console.log('email sent')
        }
    });


    /*attachments: [
            {filename: 'email-pic.png', path:'./email-pic.png'}
        ],*/

