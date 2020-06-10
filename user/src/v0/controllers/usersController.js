import { User } from '../../model'
import passport from 'passport'
import * as jwt from 'jsonwebtoken'

export default {
    index: async(req,res)=>{ 
        try {
            const users = await User.find()
            res.status(200).send({ users })
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
        res.status(201).send({message:'User successfully registered', user })
     } catch (error) {
        return res.status(400).send(error)
     }
     
    },

    login: async(req, res, next)=>{
        try {
            const user = await User.findOne(googleId)
            if(user && !user.password){
                return res.status(400).send(
                    { message: 'you created account with google, kinldy sign in with same'})
            }
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
            return res.status(400).send({message: error.message})
        }
    },

    resetNewPassword: async(req, res)=>{
       try {
        const { id, token } = req.params
        const user = await User.findById(id)
        const secret = `${user.password}-${user._id}`
        const {payload } = jwt.verify(token, secret)
       
        
        if (!req.body.password){ 
          return res.status(422).send({message: 'password cannot be empty'})
        }  
        
        if (id === payload.userId){
          const hash = await User.generatePassword(req.body.password)
          const newUser = new User({
            _id: id,
            name: user.name,
            email: user.email,
            password: hash})
         
          
          await User.updateOne( { _id: id }, newUser)
          return res.status(200).redirect('http://localhost:8084/api/v0/login')
        }
        return res.status(401).send({message: 'unauthorised'})
           
       } catch (error) {
        res.status(400).send({message: error.message})
       }
    },

    delete: async(req, res)=>{
      try {
        const user = await User.findById(req.params.id)
        await User.findOneAndDelete ({
            _id: req.params.id
        })
        res.status(200).send({ message: 'User deleted successfully'})
      } catch (error) {
          res.status(400).send({ message: error.message})
      }
      
    },

    googleLogin: async(req, res, next)=> { 
       try {
        passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next)
       } catch (error) {
           return res.status(400).send({ message: error.message})
       }
    },

    googleCallBack: async(req, res, next)=>{
        try {
            passport.authenticate('google', 
            { failureRedirect: '/login' })(req, res, next),(req, res)=>{
                // Successful authentication, redirect home.
                res.redirect('/')}
        } catch (error) {
            return res.status(400).send({message: error.message})
        }
    }
}



