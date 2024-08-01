const mongoose = require('mongoose') ;
const config = require('config') ;

const dbgr = require("debug")("development:mongoose") ;

mongoose.connect(`${config.get("MONGODB_URI")}/chicpacks`).then(()=>{
    dbgr("connected") ;
}).catch((err)=>{
    dbgr("ERROR") ;
}) ; 


module.exports = mongoose.connection ;