import express from "express"
import { getContractor, getContractorById, createContractor, updateContractor } from "../controllers/ContractorController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/contractor-registration", createContractor)

router.get("/contractors", authMiddleware, getContractor)
router.get("/contractor/:id", authMiddleware, getContractorById)
router.put("/contractor/:id", authMiddleware, updateContractor)

export default router