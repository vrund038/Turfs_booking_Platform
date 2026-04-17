const express = require("express")
const router = express.Router()

const {
login,
register,
getUsers,
deleteUser
} = require("../controllers/authController")

const adminAuth = require("../middleware/adminMiddleware")

// AUTH
router.post("/login", login)
router.post("/register", register)

// ADMIN USERS
router.get("/users", adminAuth, getUsers)
router.delete("/users/:id", adminAuth, deleteUser)

module.exports = router