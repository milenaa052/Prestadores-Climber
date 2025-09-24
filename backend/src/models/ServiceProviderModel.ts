import { DataTypes, Model } from "sequelize"
import sequelize from "../config/database.js"

export type Status = 1 | 0;

class ServiceProviderModel extends Model {
    idServiceProvider: number | undefined
    providerId: number | undefined
    serviceId: number | undefined
    minimumValue: number | undefined
    maximumValue: number | undefined
    status: Status | undefined
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
        type: DataTypes.INTEGER,
        allowNull: false
    },
    maximumValue: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
},
{
    sequelize,
    modelName: "ServiceProviderModel",
    tableName: "ServiceProviders"
})

export default ServiceProviderModel