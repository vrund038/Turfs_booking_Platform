const pool = require("../config/db")

const addStats = async(req,res)=>{

const { player_id, match_id, runs, wickets } = req.body

const existing = await pool.query(
"SELECT * FROM player_stats WHERE player_id=$1 AND match_id=$2",
[player_id, match_id]
)

if(existing.rows.length > 0){

await pool.query(
`UPDATE player_stats
SET runs=$1, wickets=$2
WHERE player_id=$3 AND match_id=$4`,
[runs, wickets, player_id, match_id]
)

} else {

await pool.query(
`INSERT INTO player_stats(player_id,match_id,runs,wickets)
VALUES($1,$2,$3,$4)`,
[player_id, match_id, runs, wickets]
)

}

res.json("Stats Updated")

}


const getStats = async(req,res)=>{

const { match_id } = req.params

const stats = await pool.query(
`SELECT ps.player_id, p.name, ps.runs, ps.wickets
FROM player_stats ps
JOIN players p ON ps.player_id = p.id
WHERE ps.match_id=$1`,
[match_id]
)

res.json(stats.rows)

}


const getLeaderboard = async(req,res)=>{

const leaderboard = await pool.query(
`SELECT 
p.id,
p.name,
SUM(ps.runs) as total_runs,
SUM(ps.wickets) as total_wickets

FROM player_stats ps
JOIN players p ON ps.player_id = p.id

GROUP BY p.id

ORDER BY total_runs DESC`
)

res.json(leaderboard.rows)

}


const getTournamentStats = async(req,res)=>{

const stats = await pool.query(
`SELECT 
p.id,
p.name,
SUM(ps.runs) as total_runs,
SUM(ps.wickets) as total_wickets,
SUM(CASE WHEN ps.runs >= 50 THEN 1 ELSE 0 END) as fifties,
SUM(CASE WHEN ps.runs >= 100 THEN 1 ELSE 0 END) as hundreds

FROM player_stats ps
JOIN players p ON ps.player_id = p.id

GROUP BY p.id`
)

res.json(stats.rows)

}

module.exports = {
addStats,
getStats,
getLeaderboard,
getTournamentStats 
}