const express = require('express');
const router = express.Router();
const trainings = require('../controllers/trainings.controller')
const courses = require('../controllers/courses.controller')

router.post('/', trainings.createTraining)
router.get('/', trainings.getAllTraining)
router.get('/:id', trainings.getTraining)
router.get('/:trainingId/courses', courses.getCourses)

module.exports = router;