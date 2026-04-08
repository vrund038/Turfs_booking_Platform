const pool = require("./db")

pool.query("SELECT NOW()", (err,res)=>{
    if(err){
        console.log(err)
    }else{
        console.log(res.rows)
    }
})