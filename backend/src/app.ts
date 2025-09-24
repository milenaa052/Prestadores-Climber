import express from "express"
import ProviderRoutes from "./routes/ProviderRoutes.js"
import AddressRoutes from "./routes/AddressRoutes.js"
import ContractServiceRoutes from "./routes/ContractServiceRoutes.js"

const app = express()
app.use(express.json())

app.use('/api', ProviderRoutes);
app.use('/api', AddressRoutes);
app.use('/api', ContractServiceRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!")
})


export default app