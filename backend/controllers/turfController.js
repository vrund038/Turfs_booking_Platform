const pool = require("../config/db")

// Get All Turfs
const getTurfs = async(req,res)=>{
    try{
        const turfs = await pool.query("SELECT * FROM turfs")
        res.json(turfs.rows)
    }catch(error){
        console.log(error)
    }
}


// Get Single Turf
const getSingleTurf = async(req,res)=>{
    try{

        const { id } = req.params

        const turf = await pool.query(
            "SELECT * FROM turfs WHERE id=$1",
            [id]
        )

        res.json(turf.rows[0])

    }catch(error){
        console.log(error)
    }
}


// Export Controllers (ADD THIS AT BOTTOM)
module.exports = {
getTurfs,
getSingleTurf
}