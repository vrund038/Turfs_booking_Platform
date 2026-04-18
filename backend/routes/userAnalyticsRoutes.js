const express = require("express")
const router = express.Router()

const { getUserAnalytics } = require("../controllers/userAnalyticsController")

router.get("/:user_id", getUserAnalytics)

module.exports = router