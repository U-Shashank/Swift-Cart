import express from 'express'
import dotenv from 'dotenv'
import 'express-async-errors'
import rateLimit from 'express-rate-limit'
import cors from 'cors'

import connectDB from './config/db.js'
import errorHandlerMiddleware from './middlewares/error-handler.js'
import notFound from './middlewares/not-found.js'

import authRouter from './routes/authRouter.js'
import categoryRouter from './routes/categoryRouter.js'
import productRouter from './routes/productRouter.js'
import braintreeRouter from './routes/braintreeRouter.js'


const app = express()
dotenv.config()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: ['https://swift-cart-seven.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.options('*', cors());

app.use(rateLimit({
    windowMs: 1 * 60 * 60 * 1000,
    max: 1000,
    message: 'You have exceeded the 1000 requests in 1 hour limit!',
    standardHeaders: true,
    legacyHeaders: false,
}))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/category', categoryRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/braintree', braintreeRouter)

app.get("/api/v1", (req, res) => {
    res.send("Home page")
})

app.use(errorHandlerMiddleware)
app.use(notFound)

const port = process.env.PORT || 3000

const start = async () => {
    await connectDB()
    app.listen(port, () => console.log(`listening on port ${port} ...`))
}

start()