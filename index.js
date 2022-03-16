const express = require("express")
const app = express()
const PORT = process.env.PORT || 1337
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()

mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log('Connected to the database!');
});

app.use(express.json());
app.use(express.static('public'));

const authRoute = require('./routes/authenticate');
const secureRoute = require('./routes/secure');
const pagesRoute = require("./routes/pages")

app.use("/", pagesRoute)
app.use("/secure", secureRoute)
app.use("/user", authRoute)



app.listen(PORT, () => {
    console.log("Listening on port: " + PORT)
})