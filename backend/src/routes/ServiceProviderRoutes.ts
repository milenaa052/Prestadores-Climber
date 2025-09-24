import express from "express"
import { createServiceProvider, getServiceProvider, getServiceProviderById, updateServiceProvider, deleteServiceProviderById } from "../controllers/ServiceProviderController.js"

const router = express.Router()

router.post("/service-provider-registration", createServiceProvider)

router.get("/api/service-provider", getServiceProvider)
router.get("/api/service-provider/:id", getServiceProviderById)
router.put("/api/service-provider/:id", updateServiceProvider)
router.delete("/api/service-provider/:id", deleteServiceProviderById)

export default router