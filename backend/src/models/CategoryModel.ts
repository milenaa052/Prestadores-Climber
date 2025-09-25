import { DataTypes, Model } from "sequelize"
import sequelize from "../config/database.js"

class CategoryModel extends Model {
    idCategory: number | undefined
    Name: string | undefined
}

CategoryModel.init({
    idCategory: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
    sequelize,
    modelName: "CategoryModel",
    tableName: "Category"
})

export default CategoryModel