const mongoose = require('mongoose') ;


const product = new mongoose.Schema({
    image: Buffer,
    name :{
        type: String
    } ,
    price: Number,
    discount: {
        type:Number,
        default:0
    },
    bgcolor: String,
    panelcolor: String,
    textcolor: String
}) ;

module.exports = mongoose.model("productmodel",product) ;