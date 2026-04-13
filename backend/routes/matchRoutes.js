const express = require("express")
const router = express.Router()

const {
generateMatches,
getMatches
} = require("../controllers/matchController")

router.post("/generate", generateMatches)
router.get("/:tournament_id", getMatches)

module.exports = router