const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const orderRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const cert = fs.readFileSync('keys/certificate.pem');

const options = {
    server: { sslCA: cert }
};
const app = express();
mongoose.connect("mongodb+srv://Jaemes:<H@ir4312>@cluster0.vnte5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority").then(() => {
        console.log("Successfully connected to DB!")
    })
    .catch(() => {
        console.log('Failed to connect to DB.')
    }, options);
app.use(bodyParser.json());
app.use((reg, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Headers",
        "Origin ,X-Requested-With,Content-Type,Accept,Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods",
        "*");
    next();
});
app.use("/api/posts", orderRoutes);
app.use("/api/user", userRoutes);
module.exports = app;