import passportLocal from 'passport-local'
import mongoose from 'mongoose'
import { User } from '../model'
const LocalStrategy = passportLocal.Strategy

export default (passport)=>{
passport.use(
    new LocalStrategy({ usernameField: 'email'}, async(email, password, done)=>{
        try {
            // find user
            const user = await User.findOne({ email })
            if(!user){
                return done(null, false, {message: 'Email is not registered'})
            }
            // match password
            const match = await User.comparePassword(password, user.password)

            if(match){
                return done(null, user)
            } else{
                return done(null, false, {message: 'Password incorrect'})
            }
        } catch (error) {
            return res.status(400).send({message: error})
        }    
    })
    )

    passport.serializeUser((user, done) =>{
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done)=> {
        User.findById(id, (err, user)=> {
          done(err, user);
        });
      });

}