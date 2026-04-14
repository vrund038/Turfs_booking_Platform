const express = require("express")
const router = express.Router()

const {
generateMatches,
getMatches,
updateMatch,
getPoints,
getWinner
} = require("../controllers/matchController")

router.post("/generate", generateMatches)
router.get("/:tournament_id", getMatches)
router.put("/:id", updateMatch)
router.get("/points/:tournament_id", getPoints)
router.get("/winner/:tournament_id", getWinner)

module.exports = router