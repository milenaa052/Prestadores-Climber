import express from "express"
import { createService, deleteService, getServiceById, getService, updateService } from "../controllers/ServiceController.js"

const router = express.Router()

router.post("/Service-registration", createService)

router.get("/api/Service", getService)
router.get("/api/Service/:id", getServiceById)
router.put("/api/Service/:id", updateService)
router.delete("/api/Service/:id", deleteService)

export default router 