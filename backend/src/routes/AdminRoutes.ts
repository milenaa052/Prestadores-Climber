import express from "express"
import { createAdmin, deleteAdminById, getAdmin, getAdminById, updateAdmin } from "../controllers/AdminController.js"

const router = express.Router()

router.post("/admin-registration", createAdmin)

router.get("/api/admin", getAdmin)
router.get("/api/admin/:id", getAdminById)
router.put("/api/admin/:id", updateAdmin)
router.delete("/api/admin/:id", deleteAdminById)

export default router