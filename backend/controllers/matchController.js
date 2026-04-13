const pool = require("../config/db")

const generateMatches = async(req,res)=>{

try{

const { tournament_id } = req.body

const teams = await pool.query(
"SELECT * FROM teams WHERE tournament_id=$1",
[tournament_id]
)

const teamList = teams.rows

let matches = []

for(let i=0;i<teamList.length;i++){

for(let j=i+1;j<teamList.length;j++){

matches.push({
team1: teamList[i].id,
team2: teamList[j].id
})

}

}

for(let match of matches){

await pool.query(
`INSERT INTO matches
(tournament_id,team1,team2)
VALUES($1,$2,$3)`,
[tournament_id, match.team1, match.team2]
)

}

res.json("Matches Generated")

}catch(error){

console.log(error)

}

}

const getMatches = async(req,res)=>{

try{

const { tournament_id } = req.params

const matches = await pool.query(
`SELECT 
m.id,
t1.team_name as team1,
t2.team_name as team2
FROM matches m
LEFT JOIN teams t1 ON m.team1 = t1.id
LEFT JOIN teams t2 ON m.team2 = t2.id
WHERE m.tournament_id=$1`,
[tournament_id]
)

res.json(matches.rows)

}catch(error){

console.log("Match Error:", error)
res.status(500).json(error.message)

}

}
module.exports = {
generateMatches,
getMatches
}