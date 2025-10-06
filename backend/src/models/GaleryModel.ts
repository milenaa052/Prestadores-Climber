import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js"

class GaleryModel extends Model {
    declare idGallery: number;
    declare providerId: number;
    declare urlPhoto: string;
    declare dateUpload: Date;
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