const express = require('express') ;
const app = express() ;

const cookieparser = require("cookie-parser") ;
const path = require('path') ;
const { url } = require('inspector');


app.use(express.json()) ;
app.use(express.urlencoded({extended:true})) ;
app.use(cookieparser()) ;
app.use(express.static(path.join(__dirname, "publuc"))) ;

app.set("view engine" , "ejs") ;

app.get("/" , (req,res)=>{
    res.send("hey") ;
})


app.listen(3000) ;