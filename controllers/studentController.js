const { students, classes } = require('../models/data');
const Student = require('../models/student');

// [GET] api/students
const readAll = async (req, res, next) => {
    try {
        if (!students || students.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No students found.',
            });
        }

        return res.status(200).json({
            success: true,
            students,
        });
    } catch (error) {
        console.error('Error in readAll:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving students.',
        });
    }
};

// [POST] api/students
const create = async (req, res, next) => {
    try {
        const { name, classId } = req.body;

        if (!name || !classId) {
            return res.status(400).json({ success: false, message: 'Missing field' });
        }

        if (students.some((student) => student.name === name)) {
            return res.status(400).json({ success: false, message: 'Name already exists' });
        }

        const checkExistsClass = classes.find((c) => c.id === classId);
        if (!checkExistsClass) {
            return res.status(400).json({ success: false, message: 'Class does not exist' });
        }

        const newId = students.length > 0 ? Math.max(...students.map((student) => student.id)) + 1 : 1;
        const newStudent = { id: newId, name, classId };

        students.push(newStudent);

        return res.status(201).json({ success: true, message: 'Student added successfully', student: newStudent });
    } catch (error) {
        console.error('Error in create:', error);
        return res.status(500).json({ success: false, message: 'An error occurred while adding the student' });
    }
};

// [GET] api/students/:id
const readById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const student = students.find((student) => student.id === parseInt(id));

        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        res.status(200).json({ success: true, student });
    } catch (error) {
        console.error('Error in readById:', error);
        res.status(500).json({ success: false, message: 'An error occurred while retrieving the student' });
    }
};

// [GET] api/students/:studentName
const readByName = async (req, res, next) => {
    try {
        const { name } = req.query;

        if (!name || name.trim() === '') {
            return res.status(400).json({ success: false, message: "Missing or invalid 'name' query parameter." });
        }

        const result = students.filter((student) => student.name.toLowerCase().includes(name.trim().toLowerCase()));

        if (result.length === 0) {
            return res.status(404).json({ success: false, message: 'No students found matching the given name.' });
        }

        return res.status(200).json({ success: true, students: result });
    } catch (error) {
        console.error('Error in readByName:', error);
        return res.status(500).json({ success: false, message: 'An error occurred while searching for students.' });
    }
};

// [GET] api/students/class?className=
const readByClass = async (req, res, next) => {
    try {
        const { className } = req.query;

        if (!className || className.trim() === '') {
            return res.status(400).json({ success: false, message: 'Missing or invalid className parameter' });
        }

        const cls = classes.find((cls) => cls.className.toLowerCase().includes(className.trim().toLowerCase()));
        if (!cls) {
            return res.status(404).json({ success: false, message: 'Class not found' });
        }

        const result = students.filter((student) => student.classId === cls.id);

        return res.status(200).json({ success: true, students: result });
    } catch (error) {
        console.error('Error in readByClass:', error);
        return res.status(500).json({ success: false, message: 'An error occurred while retrieving students by class.' });
    }
};

// [PUT] api/students/:id
const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, classId } = req.body;

        const student = students.find((student) => student.id == id);
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        if (name && students.some((student) => student.name == name && student.id != id)) {
            return res.status(400).json({ success: false, message: 'Student name must be unique' });
        }

        if (classId && !classes.some((cls) => cls.id == classId)) {
            return res.status(400).json({ success: false, message: 'Class ID does not exist' });
        }

        if (name) student.name = name;
        if (classId) student.classId = classId;

        return res.status(200).json({ success: true, message: 'Student updated successfully', student });
    } catch (error) {
        console.error('Error in update:', error);
        return res.status(500).json({ success: false, message: 'An error occurred while updating the student.' });
    }
};

// [DELETE] api/students/:id
const destroy = async (req, res, next) => {
    try {
        const { id } = req.params;
        const index = students.findIndex((student) => student.id == id);

        if (index == -1) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        students.splice(index, 1);
        return res.status(200).json({ success: true, message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Error in destroy:', error);
        return res.status(500).json({ success: false, message: 'An error occurred while deleting the student.' });
    }
};

module.exports = { readAll, create, readById, readByName, readByClass, update, destroy };
