const pool = require("../config/db")

const createTournament = async(req,res)=>{

console.log("Create Tournament API hit")

try{

const { name,location,start_date,entry_fee,created_by } = req.body

const tournament = await pool.query(
`INSERT INTO tournaments
(name,location,start_date,entry_fee,created_by)
VALUES($1,$2,$3,$4,$5)
RETURNING *`,
[name,location,start_date,entry_fee,created_by]
)

res.json(tournament.rows[0])

}catch(error){

console.log(error)
res.status(500).json(error.message)

}

}

const getTournaments = async(req,res)=>{

try{

const tournaments = await pool.query(
"SELECT * FROM tournaments ORDER BY id DESC"
)

res.json(tournaments.rows)

}catch(error){

console.log(error)
res.status(500).json(error.message)

}

}

module.exports = {
createTournament,
getTournaments
}