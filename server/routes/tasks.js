var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication')
var authorization = require('../middlewares/authorization')
var { createTask, readAllTask, searchTask, removeTask, updateTask } = require('../controllers/task')

/* GET users listing. */
router.get('/',authentication.userAuth,readAllTask);
router.post('/', authentication.userAuth,createTask);
router.get('/:id', authentication.userAuth,searchTask);
router.put('/:id',authentication.userAuth,updateTask);
router.delete('/:id',authentication.userAuth,removeTask);


module.exports = router;