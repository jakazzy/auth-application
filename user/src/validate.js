import passport from 'passport';
import { Strategy } from 'passport-local';
import Item from './model/User';

const passportConfig= (app) =>{
    app.use(passport.initialize());
    app.use(passport.session())
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
       
      passport.deserializeUser(function(id, done) {
        Item.findById(id, function (err, user) {
          done(err, user);
        });
      });
      passport.use(new Strategy(
               {
              usernameField : 'username',
              passwordField : 'password',
          }, (username, password, done) => {
            Item.findOne({ username : username }, (err, user) => {
              if(err){ 
                return done(err)
              }
              if(!user){
                var err = new Error('User not Found')
                err.status = 401;
                 return done(err)
                }
              if(!user.verifyPassword(password)){
                 return done(null, false)
                }
                return done(null, user)
            })
      
      
          }))
}



export default passportConfig;