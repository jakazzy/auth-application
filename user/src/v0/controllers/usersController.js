import Item from '../../model'

export default {
    index: async(req,res)=>{ 
        try {
            const items = await Item.find()
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

        res.send('Hi this is working')
     } catch (error) {
         res.status(400).send(error)
     }
     
    },

    login: async(req, res)=>{
        res.send("i see you login")
    }
}