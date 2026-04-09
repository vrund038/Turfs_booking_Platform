const express = require("express")
const router = express.Router()

const { getTurfs, getSingleTurf } = require("../controllers/turfController")

router.get("/", getTurfs)
router.get("/:id", getSingleTurf)

module.exports = router