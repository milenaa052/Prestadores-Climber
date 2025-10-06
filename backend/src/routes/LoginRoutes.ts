import express from "express"
import { loginUser, loggedinUser } from "../controllers/LoginController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/user", authMiddleware, loggedinUser)
router.post("/login", loginUser)

export default router