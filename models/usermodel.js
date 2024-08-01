const mongoose = require('mongoose') ;
const productmodel = require('./productmodel');

const user = new mongoose.Schema({
    fullname:{
        type: String
    },
    email:String,
    contact: Number,
    picture: String,
    password:String,
    Cart:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productmodel" ,
        }
    ],
    orders:{
        type:Array,
        default:[]
    }

}) ;

module.exports = mongoose.model("usermodel",user) ;