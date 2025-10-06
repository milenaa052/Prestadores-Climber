import express from "express"
import { createOpeningHour, getOpeningHours, getOpeningHoursById, updateOpeningHour } from "../controllers/OpeningHoursController.js"

const router = express.Router()

router.post("/openinghours-registration", createOpeningHour)

router.get("/openinghours", getOpeningHours)
router.get("/openinghours/:id", getOpeningHoursById)
router.put("/openinghours/:id", updateOpeningHour)

export default router