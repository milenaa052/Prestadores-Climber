import express from "express"
import ProviderRoutes from "./routes/ProviderRoutes.js"
import AddressRoutes from "./routes/AddressRoutes.js"
import ContractServiceRoutes from "./routes/ContractServiceRoutes.js"
import ServiceProviderRoutes from "./routes/ServiceProviderRoutes.js"
import OpeningHoursRoutes from "./routes/OpeningHoursRoutes.js"
import AdminRoutes from "./routes/AdminRoutes.js"
import ReviewRoutes from "./routes/ReviewRoutes.js"
import GalleryRoutes from "./routes/GalleryRoutes.js"
import ServiceRoutes from "./routes/ServiceRoutes.js"
import CategoryRoutes from "./routes/CategoryRoutes.js"
import LoginRoutes from "./routes/LoginRoutes.js"

const app = express()
app.use(express.json())

app.use('/api', ProviderRoutes);
app.use('/api', AddressRoutes);
app.use('/api', ContractServiceRoutes);
app.use('/api', ServiceProviderRoutes);
app.use('/api', OpeningHoursRoutes);
app.use('/api', ReviewRoutes);
app.use('/api', ServiceRoutes);
app.use('/api', ServiceProviderRoutes)
app.use('/api', OpeningHoursRoutes)
app.use('/api', AdminRoutes)
app.use('/api', GalleryRoutes)
app.use('/api', CategoryRoutes)
app.use('/api', LoginRoutes)

app.get("/", (req, res) => {
    res.send("Hello World!")
})

export default app