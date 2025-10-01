import { DataTypes, Model } from "sequelize"
import bcrypt from 'bcrypt'
import sequelize from "../config/database.js"

export type Status = 'ACTIVE' | 'INACTIVE'

class ContractorModel extends Model {
    idContractor: number | undefined
    addressId: number | undefined
    name: string | undefined
    cpf: string | undefined
    phone: string | undefined
    email: string | undefined
    password: string | undefined
    photUrl: string | undefined
    status: Status | undefined
    validatedEmail: boolean | undefined
    emailValidationToken: string | undefined
    savedLogin: boolean | undefined

    public async hashPassword() {
        this.password = await bcrypt.hash(this.password!, 10)
    }

    public async validatePassword(password: string) : Promise<boolean> {
        return await bcrypt.compare(password, this.password!)
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
        type: DataTypes.NUMBER,
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
        allowNull: false
    },
    emailValidationToken: {
        type: DataTypes.STRING,
        allowNull: false
    },
    savedLogin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
},
{
    sequelize,
    modelName: "Contractor",
    tableName: "contractors"
})

export default ContractorModel