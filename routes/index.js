const express = require('express');
const router = express.Router();
const studentRouter = require('./student');
const classRouter = require('./class');

router.use('/students', studentRouter);
router.use('/classes', classRouter);
module.exports = router;
