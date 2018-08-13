const mongoose = require('mongoose')
const Schema = mongoose.Schema

var userSchema = new Schema({
    name:String,
    email:String,
    password: String,
    facebookID:String
},{
    timestamps:true
})

var User = mongoose.model('User',userSchema) 

module.exports = User