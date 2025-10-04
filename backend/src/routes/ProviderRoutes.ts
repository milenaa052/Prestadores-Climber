import express from "express"
import { getProviders, getProviderById, createProvider, updateProvider } from "../controllers/ProviderController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"
 
const router = express.Router()

router.post("/provider-registration", createProvider)

router.get("/providers", authMiddleware, getProviders)
router.get("/provider/:id", authMiddleware, getProviderById)
router.put("/provider/:id", authMiddleware, updateProvider)

export default router