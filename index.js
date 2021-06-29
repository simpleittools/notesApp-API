const express = require("express")
const app = express()
const mongoose = require("mongoose")
const notesRouter = require("./routes/notes")

const PORT = process.env.PORT || 3000

const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost/notes"

app.use(express.static("public"))

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect(DATABASE_URL)

const db = mongoose.connection
db.on("error", error=> console.error(error))
db.once("open", () => console.log("connected to Database"))

app.use(express.json())
app.use("/notes", notesRouter)


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})