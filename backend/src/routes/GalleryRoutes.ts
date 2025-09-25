import express from "express"
import { createPhoto, deletePhotoById, getGallery, getPhotoById, updatePhoto } from "../controllers/GalleryController.js"

const router = express.Router()

router.post("/photo-registration", createPhoto)

router.get("/api/gallery", getGallery)
router.get("/api/gallery/:id", getPhotoById)
router.put("/api/gallery/:id", updatePhoto)
router.delete("/api/gallery/:id", deletePhotoById)

export default router