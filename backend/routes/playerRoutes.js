const express = require("express")
const router = express.Router()

const {
addPlayer,
getPlayers,
deletePlayer
} = require("../controllers/playerController")

router.post("/", addPlayer)
router.get("/:team_id", getPlayers)
router.delete("/:id", deletePlayer)

module.exports = router