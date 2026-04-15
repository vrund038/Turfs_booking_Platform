const pool = require("../config/db")

// Generate Matches

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


// Get Matches

const getMatches = async(req,res)=>{

try{

const { tournament_id } = req.params

const matches = await pool.query(
`SELECT 
m.id,
t1.team_name as team1,
t2.team_name as team2,
m.team1_score,
m.team2_score
FROM matches m
JOIN teams t1 ON m.team1 = t1.id
JOIN teams t2 ON m.team2 = t2.id
WHERE m.tournament_id=$1`,
[tournament_id]
)

res.json(matches.rows)

}catch(error){

console.log("Match Error:", error)
res.status(500).json(error.message)

}

}

// Update Match Score

const updateMatch = async(req,res)=>{

try{

const { id } = req.params

const { team1_score, team2_score, winner } = req.body

await pool.query(
`UPDATE matches
SET team1_score=$1,
team2_score=$2,
winner=$3
WHERE id=$4`,
[team1_score, team2_score, winner, id]
)

res.json("Match Updated")

}catch(error){
console.log(error)
}

}


// Points Table

const getPoints = async(req,res)=>{

const { tournament_id } = req.params

const points = await pool.query(

`SELECT 
teams.id,
teams.team_name,
COUNT(matches.winner) as wins

FROM teams

LEFT JOIN matches 
ON teams.id = matches.winner

WHERE teams.tournament_id=$1

GROUP BY teams.id

ORDER BY wins DESC
`,
[tournament_id]

)

res.json(points.rows)

}


//winner
const getWinner = async(req,res)=>{

const { tournament_id } = req.params

const winner = await pool.query(

`SELECT 
teams.team_name,
COUNT(matches.winner) as wins

FROM teams

LEFT JOIN matches 
ON teams.id = matches.winner

WHERE teams.tournament_id=$1

GROUP BY teams.team_name

ORDER BY wins DESC

LIMIT 1
`,
[tournament_id]

)

res.json(winner.rows[0])

}

const updateLiveScore = async (req, res) => {

const { id } = req.params

const {
batting_team,
runs,
wickets,
overs,
innings
} = req.body

// Get match data

const matchData = await pool.query(
"SELECT * FROM matches WHERE id=$1",
[id]
)

const match = matchData.rows[0]

// Update score

await pool.query(
`UPDATE matches
SET batting_team=$1,
runs=$2,
wickets=$3,
overs=$4,
innings=$5
WHERE id=$6`,
[batting_team, runs, wickets, overs, innings, id]
)


// If 2nd innings → calculate result

if (innings == 2) {

let resultText = ""
let winnerId = null

// Assume first innings score stored earlier
// (For simplicity using runs directly)

if (match.runs > runs) {
resultText = `${match.team1} won by ${match.runs - runs} runs`
winnerId = match.team1
} else if (runs > match.runs) {
resultText = `${match.team2} won by ${10 - wickets} wickets`
winnerId = match.team2
} else {
resultText = "Match Draw"
}

// Save result

await pool.query(
`UPDATE matches
SET result=$1, match_completed=true
WHERE id=$2`,
[resultText, id]
)

}

res.json("Score Updated")

}

module.exports = {
generateMatches,
getMatches,
updateMatch,
getPoints,
getWinner,
updateLiveScore
}