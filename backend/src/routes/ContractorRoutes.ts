import express from "express"
import { getContractor, getContractorById, createContractor, updateContractor } from "../controllers/ContractorController.js"
 
const router = express.Router()

router.post("/provider-registration", createContractor)

router.get("/api/providers", getContractor)
router.get("/api/provider/:id", getContractorById)
router.put("/api/provider/:id", updateContractor)

export default router