const Model = require('../models/task')
const axios = require('axios')

const createTask = function(req, res) {
    console.log(req.body);
    
    let { taskName,dueDate,description } = req.body;
    Model.create({
        taskName: taskName,
        description:description,
        dueDate:dueDate
    })
        .then(function (data) {
            res.status(200).json({ msg: 'new task added', data: data })
        })
        .catch(function (err) {
            res.status(500).json({ msg: 'add task failed',err:err })
        })
}

function readAllTask(req, res) {
    Model.find({})
        .then(function (data) {
            res.status(200).json({ msg: 'data found', data: data })
        })
        .catch(function (err) {
            res.status(500).json({ msg: err.message })
        })
}

function searchTask(req, res) {
    Model.findOne({ _id: req.params.id })
        .then(function (data) {
            res.status(200).json({ msg: 'data found', data: data })
        })
        .catch(function (err) {
            res.status(500).json({ msg: err.message })
        })
}

function removeTask(req, res) {
    Model.remove({ _id: req.params.id })
        .then(function (data) {
            res.status(201).json({ msg: 'delete task success' })
        })
        .catch(function (err) {
            res.status(500).json({ msg: 'delete task failed' })
        })
}

function updateTask(req, res) {
    let { taskName, dueDate } = req.body
    Model.update(
        {
            _id: req.params.id
        },
        {
            taskName: taskName,
        })
        .then(function (data) {
            res.status(201).json({ msg: 'Edit task success', data: data })
        })
        .catch(function (err) {
            res.status(500).json({ msg: 'Edit task failed' })
        })
}

module.exports = { createTask, searchTask, readAllTask, removeTask, updateTask }