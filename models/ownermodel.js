const mongoose = require('mongoose') ;

const owner = new mongoose.Schema({
    fullname:{
        type: String
    },
    email:String,
    gstin: String,
    picture: String,
    password:String,
    products:{
        type:Array,
        default:[]
    }
}) ;

module.exports = mongoose.model("ownermodel",owner) ;