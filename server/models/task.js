const mongoose = require('mongoose')
const Schema = mongoose.Schema

var taskSchema = new Schema({
    taskName:String,
    completeDate:Date,
    createDate: {type: Date, default:new Date()},
    dueDate:Date,
    markStatus:{type: Boolean, default:false},
    description:String,
    userID:{
        ref:'User',
        type:Schema.Types.ObjectId
    }
},{
    timestamps:true
})

var Task = mongoose.model('Task',taskSchema) 

module.exports = Task