import { Sequelize } from "sequelize"
import dotenv from "dotenv"

dotenv.config()

const host = process.env.DB_HOST;
if (!host) {
  throw new Error("DB_HOST não definido no .env");
}

const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host,
        dialect: "mysql"
    }
)

export default sequelize