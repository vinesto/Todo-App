var express = require('express');
var router = express.Router();
var { createTask, readAllTask, searchTask, removeTask, updateTask } = require('../controllers/task')

/* GET users listing. */
router.get('/', readAllTask);
router.post('/', createTask);
router.get('/:id',searchTask);
router.put('/:id',updateTask);
router.delete('/:id',removeTask);


module.exports = router;