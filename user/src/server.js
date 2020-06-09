import express from 'express'
import Router from './v0/routers'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'


const app = express()
const PORT = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: false}))
app.use('/api/v0', Router.v0Router(express))


// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('hello', (req, res)=>{
    res.send('hello how are you?')
})

app.listen(PORT, ()=>{
    console.log(`server running at http://localhost:${PORT}`)
    console.log(`press CTRL +C to stop server`)   
})