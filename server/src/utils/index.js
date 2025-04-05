const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateWebToken = async (payload) => {
    try {

        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "365d" });
        return token;

    } catch (error) {
        console.log("error while generating the token :", error);
    }
}

const verifyingToken = async (req) => {
    try {

        const token = req.get("Authentication-Token");

        if (!token) {
            return { success: false, message: "Please provide a valid token" };
        }

        const verifyingGotToken = jwt.verify(token, process.env.SECRET_KEY);

        return { success: true, data: verifyingGotToken };
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return { success: false, message: "Invalid JWT Token" };
    }
};

const userAuth = async (req, res, next) => {
    try {
        const authResult = await verifyingToken(req);

        if (!authResult.success) {
            return res.status(401).json({ message: authResult.message });
        }

        req.user = authResult.data;
        next();
    } catch (error) {
        console.error("Error in userAuth:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};



module.exports = { verifyingToken, userAuth, generateWebToken };
