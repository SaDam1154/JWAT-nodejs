const { students, classes } = require('../models/data');
const SchoolClass = require('../models/class.js');

// [POST] api/classes
const create = async (req, res, next) => {
    const { id, className } = req.body;

    // Kiểm tra tên lớp trùng
    if (classes.some((cls) => cls.className === className)) {
        return res.status(400).json({ success: false, message: 'Class name must be unique' });
    }

    const newClass = new SchoolClass(id, className);
    classes.push(newClass);

    res.status(201).json({ success: true, message: 'Class added successfully', class: newClass });
};

// [GET] api/classes/:id
const readById = async (req, res, next) => {
    const { id } = req.params;
    const student = students.find((student) => student.id === id);

    if (!student) {
        return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.status(200).json({ success: true, student });
};

// [PUT] api/classes/:id
const update = async (req, res, next) => {
    const { id } = req.params;
    const { className } = req.body;

    const cls = classes.find((cls) => cls.id === id);
    if (!cls) {
        return res.status(404).json({ success: false, message: 'Class not found' });
    }

    // Kiểm tra tên lớp trùng
    if (className && classes.some((c) => c.className === className && c.id !== id)) {
        return res.status(400).json({ success: false, message: 'Class name must be unique' });
    }

    if (className) cls.className = className;

    res.status(200).json({ success: true, message: 'Class updated successfully', class: cls });
};

// [DELETE] api/classes/:id
const destroy = async (req, res, next) => {
    const { id } = req.params;

    if (students.some((student) => student.classId === id)) {
        return res.status(400).json({ success: false, message: 'Cannot delete class with students' });
    }

    const index = classes.findIndex((cls) => cls.id === id);
    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Class not found' });
    }

    classes.splice(index, 1);
    res.status(200).json({ success: true, message: 'Class deleted successfully' });
};

module.exports = { create, readById, update, destroy };
