import { DataTypes, Model } from "sequelize"
import bcrypt from 'bcrypt'
import sequelize from "../config/database.js"

export type Status = 'ACTIVE' | 'INACTIVE';

class ProviderModel extends Model {
    declare idProvider: number;
    declare addressId: number;
    declare name: string;
    declare cnpj: string;
    declare phone: string;
    declare email: string;
    declare password: string;
    declare photUrl: string;
    declare biography: string;
    declare status: Status;
    declare linkedin: string;
    declare instagram: string;
    declare validatedEmail: boolean;
    declare emailValidationToken: string;
    declare savedLogin: boolean;

    public async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10)
        };
    }

    public async validatePassword(password: string) : Promise<boolean> {
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
        }
          
        const validate = Object.values(requirements).every(Boolean)
            
        return {
            validate,
            requirements,
            menssage: validate ? 'Valid password' : 'Password does not meet minimum requirements'
        }
    }
}

ProviderModel.init({
    idProvider: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    addressId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cnpj: {
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
    photUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    biography: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('ACTIVE', 'INACTIVE'),
        allowNull: false,
        defaultValue: 'ACTIVE',
        validate: {
            isIn: {
                args: [['ACTIVE', 'INACTIVE']],
                msg: "Status must be either 'ACTIVE' or 'INACTIVE'",
            }
        }
    },
    linkedin: {
        type: DataTypes.STRING,
        allowNull: true
    },
    instagram: {
        type: DataTypes.STRING,
        allowNull: true
    },
    validatedEmail: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    emailValidationToken: {
        type: DataTypes.STRING,
        allowNull: true
    },
    savedLogin: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
},
{
    sequelize,
    modelName: "ProviderModel",
    tableName: "providers",
    hooks: {
        beforeCreate: async (provider: ProviderModel) => {
            await provider.hashPassword();
        },

        beforeUpdate: async (provider: ProviderModel) => {
            if (provider.changed("password")) {
                await provider.hashPassword();
            }
        }
    }
})

export default ProviderModel