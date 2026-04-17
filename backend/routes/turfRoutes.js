const express = require("express")
const router = express.Router()

const { getTurfs, getSingleTurf , addTurf, getFeaturedTurfs,setFeatured,deleteTurf} = require("../controllers/turfController")
const adminAuth = require("../middleware/adminMiddleware")

router.get("/", getTurfs)
router.get("/featured", getFeaturedTurfs)
router.put("/featured/:id", setFeatured)
router.get("/:id", getSingleTurf)
router.post("/", adminAuth, addTurf)
router.delete("/:id", adminAuth, deleteTurf)

module.exports = router