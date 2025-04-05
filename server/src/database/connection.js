const mongoose = require("mongoose");
const dotEnv = require("dotenv").config();

const DB_URL = process.env.DB_URL;

module.exports.connection = async () => {
    try {

        const connect = await mongoose.connect(DB_URL);
        console.log("Database is connected !")
        return true;

    } catch (error) {
        console.log("====ERROR WHILE CONNECTING THE DATABASE======", error);
        return false;
    }
}