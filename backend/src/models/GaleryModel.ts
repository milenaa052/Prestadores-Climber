import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js"

class GaleryModel extends Model {
    idGallery: number | undefined
    providerId: number | undefined
    urlPhoto: string | undefined
    dateUpload: Date | undefined
}

GaleryModel.init({
    idGallery: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    providerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    urlPhoto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateUpload: {
        type: DataTypes.DATE,
        allowNull: false
    }
},
{
    sequelize,
    modelName: "GalleryModel",
    tableName: "gallery"
})

export default GaleryModel