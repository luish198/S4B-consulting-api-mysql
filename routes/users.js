const express = require('express');
const {getUserSales} = require('../controllers/users.js')

const router = express.Router();

router.get('/sales',getUserSales)

module.exports = router