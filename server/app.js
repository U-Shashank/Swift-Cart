import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import 'express-async-errors'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import connectDB from './config/db.js'
import errorHandlerMiddleware from './middlewares/error-handler.js'
import notFound from './middlewares/not-found.js'

import authRouter from './routes/authRouter.js'
import categoryRouter from './routes/categoryRouter.js'
import productRouter from './routes/productRouter.js'


const app = express()
dotenv.config()


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(morgan("dev"))
app.use(cors())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/category', categoryRouter)
app.use('/api/v1/product', productRouter)

app.get("/api/v1", (req,res) => {
    res.send("Home page")
})

app.use(errorHandlerMiddleware)
app.use(notFound)

const port = process.env.PORT

const start = async () => {
    await connectDB()
    app.listen(port, () => console.log(`listening on port ${port} ...`))   
}

start()