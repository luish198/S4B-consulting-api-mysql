const express = require('express');
const {sentInvoiceAndEmailLink} = require('../controllers/invoicing.js')

const router = express.Router();

router.post('/', sentInvoiceAndEmailLink);


module.exports = router