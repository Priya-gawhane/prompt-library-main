import { Express, Request, Response } from "express"
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"

import connectDb from "./config/database"
import promptRoutes from "./routes/prompt.routes"

dotenv.config()

const app: Express = express()

app.use(helmet())
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)
app.use(morgan("dev"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from prompt-library server!" })
})

app.use("/api/prompts", promptRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  connectDb()
  console.log(`server is running on http://localhost:${PORT}`)
})
