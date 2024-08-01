const express = require("express") ;
const route = express.Router() ;
const upload = require('../config/multer-config');
const productmodel = require('../models/productmodel') ;

route.post("/create",upload.single("image"),async (req,res)=>{
    try{
        
            let { name, price ,discount, bgcolor , panelcolor, textcolor} = req.body ;
        
            let product = await productmodel.create({
                image: req.file.buffer,
                name,
                price,
                discount,
                bgcolor,
                panelcolor,
                textcolor
            }) ;
            req.flash("success","product created successfully") ;
            res.redirect("/product/admin") ;
    }catch(err){
        res.send(err.message) ;
    }
}) ;

module.exports = route ;
