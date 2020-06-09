import express from 'express'
import Router from './v0/routers'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import passport from 'passport'
import session from 'express-session'

const app = express()
const PORT = process.env.PORT || 8080
import './validate';(app)

app.use(bodyParser.urlencoded({ extended: false}))
app.use('/api/v0', Router.v0Router(express))
app.use(session({ secert : 'microservices', resave : 'true', saveUninitialized: true}));



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