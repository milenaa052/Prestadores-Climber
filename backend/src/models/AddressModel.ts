import { DataTypes, Model } from "sequelize"
import sequelize from "../config/database.js"

class AddressModel extends Model {
    idAddress: number | undefined
    cep: string | undefined
    state: string | undefined
    city: string | undefined
    neighborhood: string | undefined
    street: string | undefined
    number: number | undefined
    complement: string | undefined
}

AddressModel.init({
    idAddress: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    neighborhood: {
        type: DataTypes.STRING,
        allowNull: false
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false
    },
    number: {
        type: DataTypes.INTEGER
        ,
        allowNull: false
    },
    complement: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    sequelize,
    modelName: "AddressModel",
    tableName: "address"
})

export default AddressModel