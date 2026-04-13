const express = require("express")
const router = express.Router()

const {
generateMatches,
getMatches,
updateMatch,
getPoints
} = require("../controllers/matchController")

router.post("/generate", generateMatches)
router.get("/:tournament_id", getMatches)
router.put("/:id", updateMatch)
router.get("/points/:tournament_id", getPoints)

module.exports = router