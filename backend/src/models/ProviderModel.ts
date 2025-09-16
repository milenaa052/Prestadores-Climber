import { DataTypes, Model } from "sequelize"
import bcrypt from 'bcrypt'
import sequelize from "../config/database.js"

class ProviderModel extends Model {
    idProvider: number | undefined
    AddressId: string | undefined
    name: string | undefined
    cnpj: string | undefined
    phone: string | undefined
    email: string | undefined
    password: string | undefined
    photUrl: string | undefined
    biography: string | undefined
    status: string | undefined
    linkedin: string | undefined
    instagram: string | undefined
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

ProviderModel.init({
    idProvider: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    AddressId: {
        type: DataTypes.STRING,
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
        allowNull: false
    },
    biography: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    linkedin: {
        type: DataTypes.STRING,
        allowNull: false
    },
    instagram: {
        type: DataTypes.STRING,
        allowNull: false
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
    modelName: "ProviderModel",
    tableName: "providers"
})

export default ProviderModel