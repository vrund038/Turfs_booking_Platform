const express = require("express")
const router = express.Router()

const {
addStats,
getStats
} = require("../controllers/playerStatsController")

router.post("/", addStats)
router.get("/:match_id", getStats)

module.exports = router