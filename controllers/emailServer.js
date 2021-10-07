require('dotenv').config()
const nodemailer = require('nodemailer');


const SentQuoteEmail = (req, res) => {


    const output = `
    <p></p>
    <p>Dear  ${req.body.clientFirstName} ${req.body.clientLastName}  </p>
    <p></p>

    
    <p>Here is your exclusive Offer from S4B Consulting !</p>
    <h3>Your Offer Details</h3>
    <img src="https://ik.imagekit.io/bwcdq46tkc8/s4b-consulting/s4b-logo-long_eZmAw6pklB_.png?updatedAt=1631192744046&tr=w-1200,h-628,fo-auto" alt="HTML5 Icon" width="380" height="60">
    <ul>
    <li>company Name: ${req.body.companyName}</li>
    <li>company Type: ${req.body.companyType}</li>
    <li>company Market: ${req.body.companyMarket}</li>
    <li>Phone: ${req.body.phone}</li>
    <li>Client Email: ${req.body.companyEmail}</li>
    <li>...</li>
    <li>Project: ${req.body.project}</li>
    <li>...</li>
    <li>Product: ${req.body.product}</li>
    <li>Offer Price £: ${req.body.priceOffer}</li>

    </ul>

    <img src="https://ik.imagekit.io/bwcdq46tkc8/s4b-consulting/invoiceBar_yxKmWNfJm.png?updatedAt=1633509918647" alt="HTML5 Icon" width="380" height="60">


    <h3>Do not miss out on this exclusive offer ! You are nearly there</h3>
    <p>${req.body.message}</p>
    <p>your Unique Token...</p>
    <p>${req.body.quoteKey}</p>
    <p class="full">

    
    <a href="https://www.s4b-consulting.de/orderconfirmed/orderconfirmed_1/${req.body.quoteKey}">
    <button>Click Here To Accept The offer</button>
    </a>


    </p>
    <p class="full">
    <a href="https://www.s4b-consulting.de/orderconfirmed/orderconfirmed_1/${req.body.quoteKey}">Confirm Your Offer here</a>
    </p>
    <p></p>
    <p></p>
    <p></p>
    <br>
    <p>Kind Regards</p>
    <p>S4B Consulting Admin Team</p>
    <p>Email: luis@s4b-consulting.de</p> 
    <p>Website: s4b-consulting.de</p> 

    `;

    /*
        <h1>localhost offere here....</h1>

    <a href="http://localhost:3000/orderconfirmed/orderconfirmed_1/${req.body.quoteKey}">
    <button>Click Here To Accept The offer</button>
    </a>
    */

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
        to: req.body.companyEmail,
        //cc: 'luish199@hotmail.com',
        //bcc: 'ludis.info2@gmail.com',
        subject: 'Your Quote By S4B consulting',
        text: 'Your Quote by S4B Consulting',
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
            res.render('contact', { layout: false, msg: 'Email Has been sent' });

        }
    });

    //end nodemailer --------------------------------



}






module.exports = { SentQuoteEmail }