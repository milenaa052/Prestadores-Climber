import { DataTypes, Model, Optional } from "sequelize"
import sequelize from "../config/database.js"

interface AddressAttributes {
    idAddress: number
    cep: string
    state: string
    city: string
    neighborhood: string
    street: string
    number: number
    complement?: string | null
    createdAt?: Date;
    updatedAt?: Date
}

interface AddressCreationAttributes extends Optional<AddressAttributes, "idAddress"> {}

class AddressModel extends Model<AddressAttributes, AddressCreationAttributes>
    implements AddressAttributes {
    declare idAddress: number
    declare cep: string
    declare state: string
    declare city: string
    declare neighborhood: string
    declare street: string
    declare number: number
    declare complement: string | null
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
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
        type: DataTypes.INTEGER,
        allowNull: false
    },
    complement: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
{
    sequelize,
    modelName: "AddressModel",
    tableName: "address"
})

export default AddressModel