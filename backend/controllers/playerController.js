const pool = require("../config/db")

const addPlayer = async(req,res)=>{

const { name, role, team_id } = req.body

const player = await pool.query(
`INSERT INTO players(name,role,team_id)
VALUES($1,$2,$3)
RETURNING *`,
[name,role,team_id]
)

res.json(player.rows[0])

}


const getPlayers = async(req,res)=>{

const { team_id } = req.params

// ✅ SAFETY CHECK

if(!team_id || team_id === "undefined"){
return res.status(400).json("Invalid team id")
}

const players = await pool.query(
"SELECT * FROM players WHERE team_id=$1",
[team_id]
)

res.json(players.rows)

}


const deletePlayer = async(req,res)=>{

const { id } = req.params

await pool.query(
"DELETE FROM players WHERE id=$1",
[id]
)

res.json("Player deleted")

}

module.exports = {
addPlayer,
getPlayers,
deletePlayer
}