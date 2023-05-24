import express, { json } from 'express'
import cors from 'cors'
import setupRoutes from './routes'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

console.log(dotenv.config())

const app = express()

app.use('/static', express.static('../static'))

app.use(json())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_ORIGIN
}))
app.use(cookieParser(process.env.COOKIE_SECRET))

setupRoutes(app)

app.listen(process.env.PORT, () => { console.log(`Server is started at port ${process.env.PORT}`) })
