const express = require("express") ;
const route = express.Router() ;
const {authController,loginUser,logOut} = require("../controllers/authController") ;


route.post('/register', authController) ;
route.post('/login', loginUser) ;
route.get('/logout', logOut) ;

module.exports = route ;