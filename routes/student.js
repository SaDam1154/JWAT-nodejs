const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/search', studentController.readByName);
router.get('/class', studentController.readByClass);
router.get('/:id', studentController.readById);
router.get('/', studentController.readAll);
router.post('/', studentController.create);
router.put('/:id', studentController.update);
router.delete('/:id', studentController.destroy);

module.exports = router;
