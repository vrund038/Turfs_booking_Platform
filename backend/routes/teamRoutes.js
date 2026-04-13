const express = require("express")
const router = express.Router()

const {
addTeam,
getTeams
} = require("../controllers/teamController")

router.post("/", addTeam)
router.get("/:tournament_id", getTeams)

module.exports = router