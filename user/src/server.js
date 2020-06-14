import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import passport from 'passport'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'

import Router from './v1/routers'
import auth from './config'
import * as swaggerDocument from '../docs/swagger.json'


const app = express()
const PORT = process.env.PORT || 8080

// middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser())
app.use('/api/v1', Router.v1Router(express))
app.use(cors())

// passport config for local && google
auth.passportLocal(passport)
auth.passportGoogle(passport)

// documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));



// server is running on PORT 8084 on local machine but 8080 on container
app.listen(PORT, ()=>{
    console.log(`server running at http://localhost:${PORT}`)
    console.log(`press CTRL +C to stop server`)   
})