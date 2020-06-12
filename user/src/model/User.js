import mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import ejs from 'ejs'
import validator from 'validator'

import { transporter } from '../config/sendEmail'

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
    },
    googleId: {
      type: String
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

UserSchema.statics.generateResetPasswordToken = async(password, id) =>{
    const secret = `${password}-${id}`
    const payload = { userId: id}
    return jwt.sign({ payload}, secret, {expiresIn: '1h',})
}

UserSchema.statics.resetPasswordMessage = async(id, email, user, token)=>{
    const url = `http://localhost:8084/api/v1/reset/${id}/${token}`

    ejs.renderFile(
        __dirname + '/../mailtemplate/reset-instruction.ejs', 
        { user, url},
        (err, data) => {

          if (err){
            console.log(err) 
          } else {
            // Generate email message
            const mailOptions = {
              from: 'people international',
              to: email,
              subject: 'Reset Password',
              html: data,
            }

            // send email using transporter
            transporter.sendMail(mailOptions)
              .then(data => {
                console.log('email sent successfully'); 
                return data 
              })
              .catch(err => console.log(err))
          }
        })
}

export const User = mongoose.model('User', UserSchema)

// "_id": "5ee040000e869c002b0ce3b4",
//     "name": "Mercy Asare",
//     "email": "regal@gmail.com",
//     "password": "$2b$10$BwK9DHRHsC0bZ6eKC.WZeeUwfhymbMhqMfA5Euf5C5/cPLRdCVmfW",
//     "__v": 0