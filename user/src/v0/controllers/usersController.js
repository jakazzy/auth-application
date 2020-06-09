import Item from '../../model'
import validate from '../../validate';
import passport from 'passport';

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
        if(req.body.username && req.body.password){
            const Userdata = {
                username : req.body.username,
                password : req.body.password,
                email : req.body.email,
                date : req.body.date
            }            
    await Item.register(Userdata, (user, error) => {
                try { 
                    res.send(user)
            } catch {
                res.status(400).send(error)
            }
        }
         )}
       
    },

    login: async()=>{
        passport.authenticate('local', {successRedirect: '/', failureRedirect : '/login'}), (req, res)
        try {
           
        }
        catch(error){

        }
        res.send("i see you login")
    }
}