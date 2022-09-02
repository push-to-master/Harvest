import express from "express"
import cors from "cors"
import harvest from "./router/harvest.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/harvest", harvest)
app.use("*", (req, res) => res.status(404).json({error:"not found"}))

export default app