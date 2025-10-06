import { DataTypes, Model } from "sequelize"
import sequelize from "../config/database.js"

class CategoryModel extends Model {
    declare idCategory: number;
    declare name: string;
}

CategoryModel.init({
    idCategory: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
    sequelize,
    modelName: "CategoryModel",
    tableName: "category"
})

export default CategoryModel