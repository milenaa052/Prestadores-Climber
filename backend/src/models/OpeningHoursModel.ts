import { DataTypes, Model } from "sequelize"
import sequelize from "../config/database.js"

export type Status = "ACTIVE" | "INACTIVE";

class OpeningHoursModel extends Model {
    declare idHours: number;
    declare providerId: number;
    declare weekDay: string;
    declare startTime: string;
    declare endTime: string;
    declare status: Status;
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
    },
    status: {
        type: DataTypes.ENUM('ACTIVE', 'INACTIVE'),
        allowNull: false,
        defaultValue: 'ACTIVE',
        validate: {
            isIn: {
                args: [['ACTIVE', 'INACTIVE']],
                msg: "Status must be either 'ACTIVE' or 'INACTIVE'",
            }
        }
    }
},
{
    sequelize,
    modelName: "OpeningHoursModel",
    tableName: "openingHours"
})

export default OpeningHoursModel