const express = require("express");
const qs = require('qs')
require("dotenv").config(); // A .env fájlt olvassa
const trainingsRoutes = require('./routes/trainings.routes')
const coursesRoutes = require('./routes/courses.routes')

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on("error", (error) => {
    console.log(error);
});
database.once("connected", () => {
    console.log(`Database Connected ${database.host}`);
});

const app = express()
app.set("query parser", (str) => qs.parse(str));
app.use(express.json())

app.use('/api/trainings', trainingsRoutes)
app.use('/api/courses', coursesRoutes)

const PORT = process.env.PORT | 3000;
app.listen(PORT, ()=>{
    console.log('Server started on port '+PORT)
})