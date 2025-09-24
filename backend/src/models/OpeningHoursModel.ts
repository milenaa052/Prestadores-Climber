import { DataTypes, Model } from "sequelize"
import sequelize from "../config/database.js"


class OpeningHoursModel extends Model {
    idHours: number | undefined
    providerId: number | undefined
    weekDay: string | undefined
    startTime: string | undefined
    endTime: string | undefined
}

OpeningHoursModel.init({
    idHours: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    providerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    weekDay: {
        type: DataTypes.STRING,
        allowNull: false
    },
    startTime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endTime: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    sequelize,
    modelName: "OpeningHoursModel",
    tableName: "openingHours"
})
