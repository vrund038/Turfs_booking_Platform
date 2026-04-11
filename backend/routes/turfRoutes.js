const express = require("express")
const router = express.Router()

const { getTurfs, getSingleTurf , addTurf, getFeaturedTurfs,setFeatured} = require("../controllers/turfController")
const adminAuth = require("../middleware/adminMiddleware")

router.get("/", getTurfs)
router.get("/featured", getFeaturedTurfs)
router.put("/featured/:id", setFeatured)
router.get("/:id", getSingleTurf)
router.post("/", adminAuth, addTurf)

module.exports = router