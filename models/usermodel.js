const mongoose = require('mongoose') ;
const { type } = require('os');


mongoose.connect("mongodb://localhost:27017/chicpacks") ;

const user = new mongoose.Schema({
    fullname:{
        type: String
    },
    email:String,
    contact: Number,
    picture: String,
    password:String,
    Cart:{
        type:Array,
        default:[]
    },
    isadmin:Boolean,
    orders:{
        type:Array,
        default:[]
    }

}) ;

module.exports = mongoose.model("usermodel",user) ;