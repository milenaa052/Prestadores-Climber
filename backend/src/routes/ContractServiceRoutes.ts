import express from "express"
import { createContract, getContract, getContractById, updateContract } from "../controllers/ContractServiceController.js"

const router = express.Router()

router.post("/contract-registration", createContract)

router.get("/contracts", getContract)
router.get("/contract/:id", getContractById)
router.put("/contract/:id", updateContract)

export default router