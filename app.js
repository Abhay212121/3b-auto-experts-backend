import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoute from './routes/userRoute.js'
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.json({ msg: 'Welcome!' }))
app.use('/user', userRoute)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started over PORT:${PORT}`))