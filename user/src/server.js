import express from 'express'
import Router from './v0/routers'

const app = express()
const PORT = process.env.PORT || 8080

app.get('hello', (req, res)=>{
    res.send('hello how are you?')
})

app.use('/api/v0', Router.v0Router(express))
app.listen(PORT, ()=>{
    console.log(`server running at http://localhost:${PORT}`)
    console.log(`press CTRL +C to stop server`)   
})