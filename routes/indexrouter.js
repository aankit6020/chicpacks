const express = require("express") ;
const route = express.Router() ;
const isLoggedIn = require("../middlewares/isLoggedIn") ;
const productmodel = require("../models/productmodel");
const usermodel = require("../models/usermodel");

route.get("/", function (req,res) {
    let error = req.flash("error") ;
    res.render("index",{error , loggedin: false}) ;
}) ;

route.get("/shop", isLoggedIn ,async (req,res)=>{
    let products = await productmodel.find() ;
    let success =  req.flash("success") ;

    res.render("shop",{products,success}) ;
})
route.get("/cart", isLoggedIn ,async (req,res)=>{
    
    let user = await usermodel.findOne({email : req.user.email}).populate("Cart") ;

    let bill = -1 ;
    if(user.Cart.lenth === 0)
    {
    bill = Number(user.Cart[0].price) + 20 - Number(user.Cart[0].discount)
    }
    res.render("cart", { user , bill}) ;
})
route.get("/addtocart/:id", isLoggedIn ,async (req,res)=>{
    let user = await usermodel.findOne({email : req.user.email}) ;
    user.Cart.push(req.params.productid);
    await user.save() ;
    req.flash("success", "Added to cart"); 
    res.redirect("/shop") ;
})



module.exports = route ;