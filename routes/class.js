const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

router.get('/:id', classController.readById);
router.post('/', classController.create);
router.put('/:id', classController.update);
router.delete('/:id', classController.destroy);

module.exports = router;
