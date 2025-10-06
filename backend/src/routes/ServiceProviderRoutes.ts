import express from "express"
import { createServiceProvider, getServiceProvider, getServiceProviderById, updateServiceProvider, deleteServiceProviderById } from "../controllers/ServiceProviderController.js"

const router = express.Router()

router.post("/service-provider-registration", createServiceProvider)

router.get("/services-providers", getServiceProvider)
router.get("/service-provider/:id", getServiceProviderById)
router.put("/service-provider/:id", updateServiceProvider)
router.delete("/service-provider/:id", deleteServiceProviderById)

export default router