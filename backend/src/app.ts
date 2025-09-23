import express from "express"
import ProviderRoutes from "./routes/ProviderRoutes.js"

const app = express()
app.use(express.json())

app.use('/api', ProviderRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!")
})

export default app