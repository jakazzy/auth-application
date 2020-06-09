import mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value)=>{
            return validator.isEmail(value)
        }
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

UserSchema.statics.generatePassword= async(plainText) =>{
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    return await bcrypt.hash(plainText, salt)
}

UserSchema.statics.comparePassword= async(plainText, hash) =>{
    return await bcrypt.compare(plainText, hash)
}

const User = mongoose.model('User', UserSchema)
export default User 