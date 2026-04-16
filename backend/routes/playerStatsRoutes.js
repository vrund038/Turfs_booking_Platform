const express = require("express")
const router = express.Router()

const {
addStats,
getStats,
getLeaderboard,
getTournamentStats
} = require("../controllers/playerStatsController")

router.post("/", addStats)
router.get("/:match_id", getStats)

// ✅ IMPORTANT ROUTES
router.get("/leaderboard/all", getLeaderboard)
router.get("/tournament-stats/all", getTournamentStats)

module.exports = router