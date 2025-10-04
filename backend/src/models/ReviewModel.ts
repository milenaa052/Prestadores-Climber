import { DataTypes, Model } from "sequelize"
import sequelize from "../config/database.js"

export type Status = 'ACTIVE' | 'INACTIVE';

class ReviewModel extends Model {
    declare idReview: number;
    declare contractId: string;
    declare serviceProviderReviewId: number;
    declare scoreProvider: number;
    declare depoimentProvider: string;
    declare clientReviewId: number;
    declare scoreClient: number;
    declare depoimentClient: string;
    declare status: Status; 
}

ReviewModel.init({
    idReview: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    contractId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    serviceProviderReviewId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    depoimentProvider: {
        type: DataTypes.STRING,
        allowNull: true
    },
    scoreProvider: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    clientReviewId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    scoreClient: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    depoimentClient: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
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