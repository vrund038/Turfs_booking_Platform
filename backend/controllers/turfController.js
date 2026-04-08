const pool = require("../config/db")

const getTurfs = async(req,res)=>{
    try{
        const turfs = await pool.query("SELECT * FROM turfs")
        res.json(turfs.rows)
    }catch(error){
        console.log(error)
    }
}

module.exports = {
getTurfs
}