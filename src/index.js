const express = require('express');
const dotenv = require('dotenv');
require('./database/connection.js');
const router = require('./routes/auth');
const courseRouter = require('./routes/course');
const path = require("path")
var cors = require('cors');
const index = express()
index.use(express.static('public'))

index.use(express.json())
index.use(cors())
index.use("/users", router)
index.use("/addcourse", courseRouter)


if (process.env.NODE_ENV === "production") {
    // Serve any static files
    index.use(express.static(path.resolve(__dirname, "../client/build")));
    // Handle React routing, return all requests to React app
    index.get("*", function (req, res) {
        res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
    });
}

dotenv.config()
const host = '0.0.0.0'
const port = process.env.PORT || 8001;
index.listen(port,host, function () {
    console.log(`connected port ${port}`);
})

