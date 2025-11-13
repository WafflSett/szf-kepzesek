const Course = require('../models/Course')

exports.createCourse = async (req, res, next) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json({ success: true, data: course });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
}

exports.getAllCourses = async (req, res, next) => {
    try {
        let queryStr = JSON.stringify(req.query)
        // Kicseréljük a query-ben lévő lte sztringet $lte-re
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
        const courses = await Course.find(JSON.parse(queryStr));
        res.status(200).json({ success: true, count: courses.length, data: courses });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
}

exports.getCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(400).json({ success: false, msg: 'Not found' });
        }
        res.status(200).json({ success: true, data: course });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};