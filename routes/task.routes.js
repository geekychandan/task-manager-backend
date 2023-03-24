const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const taskController = require('../controllers/task');

router.use(auth);

router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
