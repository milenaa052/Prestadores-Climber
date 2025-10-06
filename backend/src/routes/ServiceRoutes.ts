import express from "express"
import { createService, deleteService, getServiceById, getService, updateService } from "../controllers/ServiceController.js"

const router = express.Router()

router.post("/service-registration", createService)

router.get("/services", getService)
router.get("/service/:id", getServiceById)
router.put("/service/:id", updateService)
router.delete("/service/:id", deleteService)

export default router 