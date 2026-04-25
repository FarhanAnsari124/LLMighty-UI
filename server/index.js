import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './configs/connectDB.js'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import cors from 'cors'
import componentRouter from './routes/component.route.js'

dotenv.config()

const app = express()

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

app.use(express.json())
app.use(cookieParser())
app.get('/', (req, res) => {
   res.json({
    name: "LLMighty UI API",
    version: "1.0.0",
    status: "running",
  });
})
app.use('/api/auth',authRouter)
app.use('/api/user', userRouter)
app.use('/api/component',componentRouter)
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
  connectDB()
})