import express from "express"
import { createAddress, getAddress, getAddressById, updateAddress } from "../controllers/AddressController.js"

const router = express.Router()

router.post("/address-registration", createAddress)

router.get("/address", getAddress)
router.get("/address/:id", getAddressById)
router.put("/address/:id", updateAddress)

export default router