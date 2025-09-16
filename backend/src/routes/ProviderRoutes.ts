import express from "express"
import { getProviders, getProviderById, createProvider, updateProvider, deleteProviderById } from "../controllers/ProviderController.js"
 
const router = express.Router()

router.post("/api/provider-registration", createProvider)

router.get("/api/providers", getProviders)
router.get("/api/provider/:id", getProviderById)
router.put("/api/provider/:id", updateProvider)
router.delete("/api/provider/:id", deleteProviderById)

export default router