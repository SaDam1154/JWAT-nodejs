const { students, classes } = require('../models/data');
const SchoolClass = require('../models/class.js');

// [GET] api/classes
const readAll = async (req, res, next) => {
    try {
        res.status(200).json({ success: true, classes });
    } catch (error) {
        console.error('Error in readAll:', error);
        return res.status(500).json({ success: false, message: 'An error occurred while retrieving all students.' });
    }
};

// [POST] api/classes
const create = async (req, res, next) => {
    try {
        const { id, className } = req.body;

        if (!id || !className) {
            return res.status(400).json({ success: false, message: 'Missing field!' });
        }

        if (classes.some((cls) => cls.id === id)) {
            return res.status(400).json({ success: false, message: 'Class ID must be unique' });
        }

        if (classes.some((cls) => cls.className === className)) {
            return res.status(400).json({ success: false, message: 'Class name must be unique' });
        }

        const newClass = new SchoolClass(id, className);
        classes.push(newClass);

        return res.status(201).json({ success: true, message: 'Class added successfully', class: newClass });
    } catch (error) {
        console.error('Error in create:', error);
        return res.status(500).json({ success: false, message: 'An error occurred while adding the class.' });
    }
};

// [GET] api/classes/:id
const readById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cls = classes.find((cls) => cls.id === id);

        if (!cls) {
            return res.status(404).json({ success: false, message: 'Class not found' });
        }

        return res.status(200).json({ success: true, class: cls });
    } catch (error) {
        console.error('Error in readClassById:', error);
        return res.status(500).json({ success: false, message: 'An error occurred while retrieving the class.' });
    }
};

// [PUT] api/classes/:id
const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { className } = req.body;

        const cls = classes.find((cls) => cls.id === id);
        if (!cls) {
            return res.status(404).json({ success: false, message: 'Class not found' });
        }

        if (className && classes.some((c) => c.className === className && c.id !== id)) {
            return res.status(400).json({ success: false, message: 'Class name must be unique' });
        }

        if (className) cls.className = className;

        return res.status(200).json({ success: true, message: 'Class updated successfully', class: cls });
    } catch (error) {
        console.error('Error in update:', error);
        return res.status(500).json({ success: false, message: 'An error occurred while updating the class.' });
    }
};

// [DELETE] api/classes/:id
const destroy = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (students.some((student) => student.classId === id)) {
            return res.status(400).json({ success: false, message: 'Cannot delete class with students' });
        }

        const index = classes.findIndex((cls) => cls.id === id);
        if (index === -1) {
            return res.status(404).json({ success: false, message: 'Class not found' });
        }

        classes.splice(index, 1);
        return res.status(200).json({ success: true, message: 'Class deleted successfully' });
    } catch (error) {
        console.error('Error in destroy:', error);
        return res.status(500).json({ success: false, message: 'An error occurred while deleting the class.' });
    }
};

module.exports = { readAll, create, readById, update, destroy };
