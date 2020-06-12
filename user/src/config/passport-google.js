import 'dotenv/config';
import googlePassport from 'passport-google-oauth20'
import { config } from './config'
import { User } from '../model'

const GoogleStrategy = googlePassport.Strategy;
const  con = config.dev

export default (passport)=>{
const options = {
    clientID: con.google_client_id,
    clientSecret: con.google_client_secret,
    callbackURL: "http://localhost:8084/api/v1/auth/google/callback"
  }

const verifyCallback = async(accessToken, refreshToken, profile, done)=>{
try { 
   const user = await User.findOne({googleId: profile.id})
   if (user && user.email){
       return done(null, user)
   } else {
       const newUser = new User({
           name: profile.displayName,
           email: profile.emails[0].value,
           googleId: profile.id
       })
       const user = await newUser.save()
       return done(null, user)
   }
} catch (error) { 
    return done(error)
}}
   passport.use(new GoogleStrategy( options, verifyCallback))
}
