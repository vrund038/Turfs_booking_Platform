const express = require("express")
const router = express.Router()

const { getTurfs, getSingleTurf , addTurf} = require("../controllers/turfController")
const adminAuth = require("../middleware/adminMiddleware")

router.get("/", getTurfs)
router.get("/:id", getSingleTurf)
router.post("/", adminAuth, addTurf)

module.exports = router