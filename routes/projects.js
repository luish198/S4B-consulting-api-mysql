const express = require('express');
const {getProjects, getOneProjectById} = require('../controllers/projects')

const router = express.Router();

router.get('/', getProjects);

router.get('/:project_id', getOneProjectById)


module.exports = router