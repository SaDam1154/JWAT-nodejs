const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/:id', studentController.readById);
router.get('/', studentController.readAll);
router.get('/search/:name', studentController.readByName);
router.get('/class/:className', studentController.readByClass);
router.post('/', studentController.create);
router.put('/:id', studentController.update);
router.delete('/:id', studentController.destroy);

module.exports = router;
