import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import passport from 'passport'
import cors from 'cors'

import Router from './v0/routers'
import passportLocal from './config/passport-local'


const app = express()
const PORT = process.env.PORT || 8080
import './validate';(app)

// middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser())
app.use('/api/v0', Router.v0Router(express))

app.use(cors())


// passport config
passportLocal(passport)

// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/', (req, res)=>{
    res.send('welcome to the auth application')
})

app.listen(PORT, ()=>{
    console.log(`server running at http://localhost:${PORT}`)
    console.log(`press CTRL +C to stop server`)   
})

export default app;