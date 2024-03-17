const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    employeName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    salary:{
        type:Number,
        require:true
    },
    address:{
        type:String,
        require:false
    },
    category_id:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:false
    }
})
module.exports = mongoose.model('employee',employeeSchema)