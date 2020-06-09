import User from '../../model'

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
        if(password.length < 8){
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
         res.status(400).send(error)
     }
     
    },

    login: async(req, res)=>{
        res.send("i see you login")
    }
}