const pool = require("../config/db")

const addTeam = async(req,res)=>{

try{

const { team_name, captain_name, tournament_id } = req.body

const team = await pool.query(
`INSERT INTO teams
(team_name, captain_name, tournament_id)
VALUES($1,$2,$3)
RETURNING *`,
[team_name, captain_name, tournament_id]
)

res.json(team.rows[0])

}catch(error){

console.log(error)
res.status(500).json(error.message)

}

}

const getTeams = async(req,res)=>{

try{

const { tournament_id } = req.params

const teams = await pool.query(
"SELECT * FROM teams WHERE tournament_id=$1",
[tournament_id]
)

res.json(teams.rows)

}catch(error){

console.log("Team Fetch Error:", error)
res.status(500).json(error.message)

}

}

module.exports = {
addTeam,
getTeams
}