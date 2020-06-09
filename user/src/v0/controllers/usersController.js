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
        res.send('Hi this is working')
     } catch (error) {
         res.status(400).send(error)
     }
     
    },

    login: async(req, res)=>{
        res.send("i see you login")
    }
}