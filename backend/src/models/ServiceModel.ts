import { DataTypes, Model } from "sequelize"
import sequelize from "../config/database.js"

class ServiceModel extends Model {
    idService: number | undefined
    CategoryId: number | undefined
    Name: string | undefined
    Status: 'ACTIVE'| 'INACTIVE' | undefined 
}

ServiceModel.init({
    idService: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Status: {
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