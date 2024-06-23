import jwt from "jsonwebtoken";
import userDAL from "../dal/user.js";
async function getUserLogin(req) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new Error("Authorization header is missing or malformed");
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        console.error("Error decoding JWT:", error.message);
        throw new Error("Unauthorized");
    }
}

export { getUserLogin };
