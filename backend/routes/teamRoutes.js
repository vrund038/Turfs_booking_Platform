const express = require("express")
const router = express.Router()

const {
registerTeam,
getTeams
} = require("../controllers/teamController")

router.post("/", registerTeam)
router.get("/:tournament_id", getTeams)

module.exports = router