import { DataTypes, Model, Optional } from "sequelize"
import sequelize from "../config/database.js"

class AddressModel extends Model {
    declare idAddress: number;
    declare cep: string;
    declare state: string;
    declare city: string;
    declare neighborhood: string;
    declare street: string;
    declare number: number
    declare complement: string | null;
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