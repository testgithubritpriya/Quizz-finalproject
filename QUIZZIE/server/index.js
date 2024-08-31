const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/auth");
const quizRoutes = require("./routes/quiz");

const app = express();
dotenv.config();

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
    })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Successfully Connected to MongoDB');
    }).catch((err) => {
        console.log('Error Connecting to MongoDB', err);
    })

app.use("/api/auth", userRoutes);
app.use("/api/quiz", quizRoutes);
app.listen(process.env.PORT || port, () => {
    console.log(`Server Up and running on port: ${process.env.PORT} `);
});