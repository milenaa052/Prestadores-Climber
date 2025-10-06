import express from "express"
import { createPhoto, deletePhotoById, getGallery, getPhotoById, updatePhoto } from "../controllers/GalleryController.js"

const router = express.Router()

router.post("/photo-registration", createPhoto)

router.get("/gallery", getGallery)
router.get("/photo/:id", getPhotoById)
router.put("/photo/:id", updatePhoto)
router.delete("/photo/:id", deletePhotoById)

export default router