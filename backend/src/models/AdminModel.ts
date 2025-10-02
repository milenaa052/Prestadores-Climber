import { DataTypes, Model } from "sequelize"
import bcrypt from 'bcrypt'
import sequelize from "../config/database.js"

export type Status = 1 | 0;

class AdminModel extends Model {
    declare idAdmin: number;
    declare name: string;
    declare phone: string;
    declare email: string;
    declare password: string;
    declare status: Status;

    public async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10)
        };
    }

    public async validatePassword(password: string): Promise<boolean> {
        if (!this.password) throw new Error("Password not set for this user");
        return await bcrypt.compare(password, this.password);
    }

    public static validatePasswordLevel(password: string) {
        const requirements = {
            hasACapitalLetter: /[A-Z]/.test(password),
            hasLowerCase: /[a-z]/.test(password),
            hasANumber: /[0-9]/.test(password),
            thereIsSpecial: /[!@#$%&*°?]/.test(password),
            minimumSize: password.length >= 8
        };
          
        const validate = Object.values(requirements).every(Boolean);
            
        return {
            validate,
            requirements,
            menssage: validate ? 'Valid password' : 'Password does not meet minimum requirements'
        };
    }
}

AdminModel.init({
    idAdmin: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 1
    }
},
{
    sequelize,
    modelName: "AdminModel",
    tableName: "admin",
    hooks: {
        beforeCreate: async (admin: AdminModel) => {
            await admin.hashPassword();
        },

        beforeUpdate: async (admin: AdminModel) => {
            if (admin.changed("password")) {
                await admin.hashPassword();
            }
        }
    }
})

export default AdminModel