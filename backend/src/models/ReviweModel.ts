import { DataTypes, Model } from "sequelize"
import sequelize from "../config/database.js"

class ReviewModel extends Model {
    idReview: number | undefined
    contratoid: string | undefined
    ServiceProviderReviewid: number | null | undefined
    ScoreProvider: number | undefined
    DepoimentProvider: string | null| undefined
    ClientReviewid: number | null | undefined
    ScoreClient: number | undefined
    DepoimentClient: string | null| undefined
    Status: 'ACTIVE'| 'INACTIVE' | undefined 
}

ReviewModel.init({
    idReview: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ContratoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ServiceProviderReviewId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    DepoimentProvider: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ScoreProvider: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    ClientReviewId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    ScoreClient: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    DepoimentClient: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Status: {
        type: DataTypes.ENUM('ACTIVE', 'INACTIVE'),
        allowNull: false,
        defaultValue: 'ACTIVE'
    }  
},
{
    sequelize,
    modelName: "ReviewModel",
    tableName: "Review"
})

export default ReviewModel