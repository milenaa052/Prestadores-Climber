import app from "./app.js"
import sequelize from "./config/database.js"

const port = 3000

sequelize
    .sync({ alter: true })
    .then(() => {
        console.log("Synchronized database")
        app.listen(port, () => {
            console.log("Server is running on port ", port)
        })
    })
    .catch((error) => {
        console.log("Error synchronizing the database: ", error)
    })