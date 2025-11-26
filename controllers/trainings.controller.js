const Training = require('../models/Training')

exports.createTraining = async (req, res, next) => {
    try {
        const training = await Training.create(req.body);
        res.status(201).json({ success: true, data: training });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
}

exports.getAllTraining = async (req, res, next) => {
    try {
        let queryStr = JSON.stringify(req.query)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

        let query = Training.find(JSON.parse(queryStr));
        // select specific fields
        if (req.query.select) {
            const fields = req.query.select.split(',').join(' ');
            query = query.select(fields);
        }

        // sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // pagination
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 2
        const startIndex = (page - 1) * limit
        const endIndex = page * limit;
        const total = await Training.countDocuments();
        query = query.skip(startIndex).limit(limit)
        const pagination = {};
        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit,
            };
        }
        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit,
            };
        }

        // result
        const trainings = await query.populate();
        res.status(200).json({ success: true, count: trainings.length, pagination, data: trainings });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
}

exports.getTraining = async (req, res, next) => {
    try {
        const training = await Training.findById(req.params.id);
        if (!training) {
            return res.status(400).json({ success: false, msg: 'Not found' });
        }
        res.status(200).json({ success: true, data: training });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};