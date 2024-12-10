const { students, classes } = require('../models/data');
const Student = require('../models/student');

// [GET] api/students
const readAll = async (req, res, next) => {
    console.log('Call All');
    res.status(200).json({ success: true, students });
};

// [POST] api/students
const create = async (req, res, next) => {
    const { name, classId } = req.body;

    if (!name || !classId) {
        return res.status(400).send('Missing field');
    }
    if (students.some((student) => student.name == name)) {
        return res.status(400).json({ success: false, message: 'Exist name!' });
    }

    const checkExitsClass = classes.find((c) => c.id == classId);
    if (!checkExitsClass) return res.status(400).json({ success: false, message: 'Class not exist' });

    // Tìm ID mới dựa trên ID lớn nhất hiện có
    const newId = students.length > 0 ? Math.max(...students.map((student) => student.id)) + 1 : 0;

    const newStudent = { id: newId, name, classId };
    students.push(newStudent);

    res.status(201).json({ success: true, message: 'Student added successfully!', student: newStudent });
};

// [GET] api/students/:id
const readById = async (req, res, next) => {
    console.log('call ID students');
    const { id } = req.params;
    const student = students.find((student) => student.id == id);

    if (!student) {
        return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.status(200).json({ success: true, student });
};

// [GET] api/students/:studentName
const readByName = async (req, res, next) => {
    console.log('call Name students');

    const { name } = req.params;
    const result = students.filter((student) => student.name.toLowerCase().includes(name.toLowerCase()));

    res.status(200).json({ success: true, student: result });
};

// [GET] api/students/:studentName
const readByClass = async (req, res, next) => {
    const { className } = req.params;

    const cls = classes.find((cls) => cls.className == className);
    if (!cls) {
        return res.status(404).json({ success: false, message: 'Class not found' });
    }

    const result = students.filter((student) => student.classId == cls.id);
    res.status(200).json({ success: true, student: result });
};

// [PUT] api/students/:id
const update = async (req, res, next) => {
    const { id } = req.params;
    const { name, classId } = req.body;

    const student = students.find((student) => student.id == id);
    if (!student) {
        return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // Kiểm tra tên trùng nếu thay đổi
    if (name && students.some((student) => student.name == name && student.id != id)) {
        return res.status(400).json({ success: false, message: 'Student name must be unique' });
    }

    // Kiểm tra classId tồn tại
    if (classId && !classes.some((cls) => cls.id == classId)) {
        return res.status(400).json({ success: false, message: 'Class ID does not exist' });
    }

    // Cập nhật thông tin
    if (name) student.name = name;
    if (classId) student.classId = classId;

    res.status(200).json({ success: true, message: 'Student updated successfully', student });
};

// [DELETE] api/students/:id
const destroy = async (req, res, next) => {
    const { id } = req.params;
    const index = students.findIndex((student) => student.id == id);

    if (index == -1) {
        return res.status(404).json({ success: false, message: 'Student not found' });
    }

    students.splice(index, 1);
    res.json({ success: true, message: 'Student deleted successfully' });
};

module.exports = { readAll, create, readById, readByName, readByClass, update, destroy };
