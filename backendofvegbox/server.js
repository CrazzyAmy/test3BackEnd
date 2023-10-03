import express from "express"
import cors from "cors"
import reviews from "./reviews.route.js"
import subRouter from "./models/subscriber.cjs"
import subscribersRouter from './routes/subscribers.cjs'
const app = express()
app.use(cors())
app.use(express.json())
// app.use('/subscribers', subRouter)
app.use('/subscribers', subscribersRouter)
app.use("/api/v1/reviews", reviews)
// app.use("*", (req, res) => res.status(404).json({error: "not found"}))

export default app