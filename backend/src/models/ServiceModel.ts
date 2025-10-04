import { DataTypes, Model } from "sequelize"
import sequelize from "../config/database.js"

export type Status = 'ACTIVE' | 'INACTIVE';

class ServiceModel extends Model {
    declare idService: number;
    declare categoryId: number;
    declare name: string;
    declare status: Status;
}

ServiceModel.init({
    idService: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('ACTIVE', 'INACTIVE'),
        allowNull: false,
        defaultValue: 'ACTIVE',
    }  
},
{
    sequelize,
    modelName: "ServiceModel",
    tableName: "Service"
})

export default ServiceModel