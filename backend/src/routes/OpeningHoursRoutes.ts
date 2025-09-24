import express from "express"
import { createOpeningHour, deleteOpeningHourById, getOpeningHours, getOpeningHoursById, updateOpeningHour } from "../controllers/OpeningHoursController.js"

 
const router = express.Router()

router.post("/openinghours-registration", createOpeningHour)

router.get("/api/openinghours", getOpeningHours)
router.get("/api/openinghours/:id", getOpeningHoursById)
router.put("/api/openinghours/:id", updateOpeningHour)
router.delete("/api/openinghours/:id", deleteOpeningHourById)

export default router