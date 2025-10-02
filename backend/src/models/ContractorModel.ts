import { DataTypes, Model } from "sequelize"
import bcrypt from 'bcrypt'
import sequelize from "../config/database.js"

export type Status = 'ACTIVE' | 'INACTIVE';

class ContractorModel extends Model {
    declare idContractor: number;
    declare addressId: number;
    declare name: string;
    declare cpf: string;
    declare phone: string;
    declare email: string;
    declare password: string;
    declare photUrl: string;
    declare status: Status;
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

ContractorModel.init({
    idContractor: {
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
    cpf: {
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
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'ACTIVE'
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
    modelName: "Contractor",
    tableName: "contractors",
    hooks: {
        beforeCreate: async (contractor: ContractorModel) => {
            await contractor.hashPassword();
        },

        beforeUpdate: async (contractor: ContractorModel) => {
            if (contractor.changed("password")) {
                await contractor.hashPassword();
            }
        }
    }
})

export default ContractorModel