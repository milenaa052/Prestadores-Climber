import { DataTypes, Model } from "sequelize"
import sequelize from "../config/database.js"

export type Status = 'ACTIVE' | 'INACTIVE';

class ServiceProviderModel extends Model {
    declare idServiceProvider: number;
    declare providerId: number;
    declare serviceId: number;
    declare minimumValue: number;
    declare maximumValue: number;
    declare status: Status;
}

ServiceProviderModel.init({
    idServiceProvider: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    providerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    minimumValue: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    maximumValue: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('ACTIVE', 'INACTIVE'),
        allowNull: false,
        defaultValue: "ACTIVE"
    }
},
{
    sequelize,
    modelName: "ServiceProviderModel",
    tableName: "ServiceProviders"
})

export default ServiceProviderModel