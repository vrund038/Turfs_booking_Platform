const express = require("express")
const router = express.Router()

const { getTurfs } = require("../controllers/turfController")

router.get("/", getTurfs)

module.exports = router