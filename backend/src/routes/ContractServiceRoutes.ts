import express from "express"
import { createContract, deleteContractById, getContract, getContractById, updateContract } from "../controllers/ContractServiceController.js"

const router = express.Router()

router.post("/contract-registration", createContract)

router.get("/api/contract", getContract)
router.get("/api/contract/:id", getContractById)
router.put("/api/contract/:id", updateContract)
router.delete("/api/contract/:id", deleteContractById)

export default router