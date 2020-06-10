import { User } from '../../model'
import passport from 'passport'

export default {
    index: async(req,res)=>{ 
        try {
            const user = await User.find()
            res.status(200).send({message: items})
        } catch (error) {
            res.status(400).send({ message: error})
        }
    },

    create: async(req, res)=>{
     try {
         let errors = []
         const { name, email, password } = req.body
        //  required fields
        if(!name || !email || !password){
            errors.push({ message: 'Please fill in all required fields'})
        }

        // check password length
        if(password && password.length < 8){
            errors.push({ message: "Password should not be less than 8 characters"})
        }

        if(errors.length){
           return res.status(422).send({message: errors.join(",")})
        }


        const person = await User.findOne({email})
        if(person){
            return res.status(422).send({ message: "User Already exists"})
        }
        const newPassword = await User.generatePassword(password)
        const newUser = await new User({
            name,
            email,
            password: newPassword
        })

       const user = await newUser.save()
        res.status(200).send({message:'User successfully registered', user })
     } catch (error) {
        return res.status(400).send(error)
     }
     
    },

    login: async(req, res, next)=>{
        try {
            passport.authenticate('local', {
                successRedirect: '/dashboard',
                failureRedirect: '/login',
                failureFlash: true
            })(req, res, next)
        } catch (error) {
           return res.status(400).send({message: error})
        }
       
    },

    show: async(req, res)=>{  
        res.status(200).send({message: 'Welcome to the dashboard'})
    },

    logout: async(req, res)=>{
        req.logout()
        res.redirect('/api/v0/login')
    },

    sendResetPasswordEmail: async(req, res)=>{
        try {
            const { email } = req.body

            if(!email){
                return res.status(422).send({
                    message: 'email cannot be empty'
                })
            }

            const user = await User.findOne({ email })
            if (!user){
                return res.status(404).send({ message: 'user does not exist'})
            }

            const token = await User.generateResetPasswordToken(user.password, user._id)

            await User.resetPasswordMessage(
                user._id, email, user, token
            )
        
            res.status(200).send({
                message: 'Follow instructions to change password in email',
              })
       
        } catch (error) {
            console.log(error, '-----------------------------------');
            
            return res.status(400).send({message: error.message})
        }
    },
    resetNewPassword: async(req, res)=>{
        res.status(200).send("i see you")
    }
}