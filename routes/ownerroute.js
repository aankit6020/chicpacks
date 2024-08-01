const express = require("express") 
const route = express.Router() ;
const ownermodel = require('../models/ownermodel') 


if(process.env.NODE_ENV === "development")
{
    route.post("/create",async function(req,res){
        let owners = await ownermodel.find() ;

        if(owners.length > 0)
        {
            res.status(503).send("sorry we cant create your account") ;
        }
        
        let {fullname,email,password} = req.body ;

        let newOwner = await ownermodel.create({
            fullname,
            email,
            password
        })

        res.status(201).send(newOwner) ;
    }) ;
}

route.get("/admin" , function(req,res){
   let success = res.flash("success") ; 
   res.render("createproducts",{ success })
}) ;
module.exports = route ;