const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectionWithDB = require("./src/database/connection");
const cors = require("cors")


const Port = process.env.port || 5000;

const expressApp = require("../server/src/express-app");
app.use(bodyParser.json());

const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            "http://localhost:3000",
            "http://localhost:5000",
        ];

        // Allow localhost origins dynamically for Flutter app development
        if (
            !origin ||
            allowedOrigins.includes(origin) ||
            /^http:\/\/localhost:\d+$/.test(origin)
        ) {
            callback(null, true); // Allow the request
        } else {
            console.error("Blocked by CORS:", origin);
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
};

app.use(cors(corsOptions));


const startServer = async () => {

    await connectionWithDB.connection()
    await expressApp(app);
    app.listen(Port, () => {
        console.log("Server is live on ,", Port);
    })
}

startServer();