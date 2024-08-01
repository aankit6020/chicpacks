const express = require('express') ;
const app = express() ;
const cookieparser = require("cookie-parser") ;
const path = require('path') ;
const expressSession = require("express-session");
const flash = require("connect-flash");
const ownerRoute = require("./routes/ownerroute") ;
const productRoute = require("./routes/productroute") ;
const userRoute = require("./routes/userroute") ;
const indexrouter = require("./routes/indexrouter")

require("dotenv").config() ;

const db = require("./config/mongoose-connection") ;

app.use(express.json()) ;
app.use(express.urlencoded({extended:true})) ;
app.use(cookieparser()) ;
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
);
app.use(flash()) ;
app.use(express.static(path.join(__dirname, "public"))) ;

app.set("view engine" , "ejs") ;

app.use("/" ,indexrouter) ;
app.use("/users" ,userRoute) ;
app.use("/owners" ,ownerRoute) ;
app.use("/products" ,productRoute) ;


app.listen(3000) ;