import { Request, Response } from "express"
import GalleryModel from "../models/GaleryModel.js"

export const getGallery = async (req: Request, res: Response) => {
    const photos = await GalleryModel.findAll();
    return res.status(200).send(photos);
}

export const getPhotoById = async (req: Request<{ id: string }>, res: Response) => {
    const photos = await GalleryModel.findByPk(req.params.id);
    return res.status(200).json(photos);
}

export const createPhoto = async (req: Request, res: Response) => {
    try {

        const { providerId, urlPhoto, dateUpload } = req.body;

        if (!providerId || !urlPhoto || !dateUpload) {
            return res.status(400)
                .json({ error: "All fields are required" })
        }

        const photos = await GalleryModel.create({
            providerId,
            urlPhoto,
            dateUpload
        });

        return res.status(201).json(photos);
    } catch (error) {
        return res.status(500).json("Internal server error " + error)
    }
}

export const updatePhoto = async (req: Request, res: Response) => {
    try {

        const { providerId, urlPhoto, dateUpload } = req.body;

        if (!providerId || !urlPhoto || !dateUpload) {
            return res.status(400)
                .json({ error: "All fields are required" })
        }

        const photos = await GalleryModel.findByPk(req.params.id);

        if (!photos) {
            return res.status(404)
                .json({ error: "Photo not found" })
        }

        photos.providerId = providerId;
        photos.urlPhoto = urlPhoto;
        photos.dateUpload = dateUpload;

        await photos.save();

        return res.status(200).json(photos);

    } catch (error) {
        return res.status(500).json("Internal server error " + error)
    }
}

export const deletePhotoById = async (req: Request<{ id: string}>, res: Response) => {  
    try {
        const photos = await GalleryModel.findByPk(req.params.id);
        
        if(!photos) {
            return res.status(404)
                .json({error: "Photo found"})
        }

        await photos.destroy();
        return res.status(204).send();

    } catch (error) {
        return res.status(500).json("Internal server error " + error)
    }
}