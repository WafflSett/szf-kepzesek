const express = require('express');
const router = express.Router({mergeParams:true});
const courses = require('../controllers/courses.controller')

// router.post('/', courses.createTraining)
router.get('/', courses.getCourses)

module.exports = router;