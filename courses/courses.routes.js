const express = require('express');
const router = express.Router();
const courses = require('../controllers/courses.controller')

router.post('/', courses.createTraining)
router.get('/', courses.getAllTraining)
router.get('/:id', courses.getTraining)

module.exports = router;