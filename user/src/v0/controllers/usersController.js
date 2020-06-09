export default {
    index: async(req,res)=>{ 
        res.send('Hi this is working')
    },

    create: async(req, res)=>{
        res.send("I see you created")
    },

    login: async(req, res)=>{
        res.send("i see you login")
    }
}