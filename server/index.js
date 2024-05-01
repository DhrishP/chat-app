import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes'

dotenv.config()

const app = express()
const 

app.get('/',(req,res)=>{
    res.send("Hello world")
})

app.use('/api/auth',authRoutes)



app.listen(8000,()=>{
    console.log(`Server running on PORT 8000`)
})
