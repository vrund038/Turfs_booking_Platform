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

const addTurf = async(req,res)=>{

const { name, location, price, image } = req.body

await pool.query(
"INSERT INTO turfs(name, location, price_per_hour, image) VALUES($1,$2,$3,$4)",
[name, location, price, image]
)

res.json("Turf Added")

}

const getFeaturedTurfs = async(req,res)=>{

try{

const turfs = await pool.query(
"SELECT * FROM turfs WHERE featured=true"
)

res.json(turfs.rows)

}catch(error){
console.log(error)
}

}


const setFeatured = async(req,res)=>{

const { id } = req.params

await pool.query(
"UPDATE turfs SET featured=true WHERE id=$1",
[id]
)

res.json("Turf Featured")

}


const deleteTurf = async(req,res)=>{

const { id } = req.params

await pool.query(
"DELETE FROM turfs WHERE id=$1",
[id]
)

res.json("Turf Deleted")

}

// Export Controllers (ADD THIS AT BOTTOM)
module.exports = {
getTurfs,
getSingleTurf,
addTurf,
getFeaturedTurfs,
setFeatured,
deleteTurf
}