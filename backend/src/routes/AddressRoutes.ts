import express from "express"
import { createAdress, deleteAddressById, getAddress, getAddressById, updateAdress } from "../controllers/AddressController.js"

const router = express.Router()

router.post("/address-registration", createAdress)

router.get("/api/address", getAddress)
router.get("/api/address/:id", getAddressById)
router.put("/api/address/:id", updateAdress)
router.delete("/api/address/:id", deleteAddressById)

export default router