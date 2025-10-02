import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js"

export type Status = 'PENDING' | 'IN PROGRESS' | 'COMPLETED' | 'CANCELLED';

class ContractServiceModel extends Model {
    declare idContract: number;
    declare providerId: number;
    declare customerId: number;
    declare providerServiceId: number;
    declare dateService: Date;
    declare startTime: string;
    declare endTime: string;
    declare status: Status;
    declare value: number;
}

ContractServiceModel.init({
    idContract: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    providerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    providerServiceId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dateService: {
        type: DataTypes.DATEONLY,
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
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "PENDING"
    },
    value: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
},
{
    sequelize,
    modelName: "ContractServiceModel",
    tableName: "contracts"
})

export default ContractServiceModel