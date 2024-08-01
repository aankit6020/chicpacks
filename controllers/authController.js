
const usermodel = require("../models/usermodel") ;
const bcrypt = require("bcrypt") ;
const saltRounds = 10;
const jwt = require("jsonwebtoken") ;
const {generateToken} = require("../utils/generateToken") ;

module.exports.authController = async (req,res)=>{
    try{
        
        let {fullname , email , password } = req.body ;
        
        let user = await usermodel.findOne({email:email}) ;
        if(user)return res.status(401).send("you already have an Acount") ;

        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt,async function(err, hash) {
                if(err) return res.send(err.message) ;
                else{
                    let newUser = await usermodel.create({
                        fullname,
                        password:hash,
                        email,
                    }) ;

                    let token = generateToken(newUser )
                    res.cookie("token",token) ;
                    res.status(201).redirect("/shop") ;
                }
            });
        });

    }
    catch(err){
        res.send(err.message) ;
    }
}

module.exports.loginUser = async (req,res)=>{
    try{
        
        let {email , password } = req.body ;
        
        let user = await usermodel.findOne({email:email}) ;
        console.log(user) ;
        if(!user){
            req.flash("error", "Email or Password incorrect");
            return res.redirect("/");
        }

       bcrypt.compare(password,user.password, function(err,result){
        if(result){
            let token = generateToken(user) ;
            res.cookie("token",token) ;
            res.status(201).redirect("/shop") ;
        }
        else{
            req.flash("error", "Email or Password incorrect");
            return res.redirect("/");
        }
       }) ;
    }
    catch(err){
        res.send(err.message) ;
    }

}

module.exports.logOut = (req,res)=>{
    res.cookie("token","") ;
    res.redirect("/") ;
};