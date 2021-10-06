const express = require('express');

const {createNewPreconfirmation, createNewConfirmation, getMaxConfoRef} = require('../controllers/orders')

const router = express.Router()

router.get('/confomaxref', getMaxConfoRef)

router.post('/newpreorder', createNewPreconfirmation)

router.post('/newconfirmation', createNewConfirmation)



module.exports = router
