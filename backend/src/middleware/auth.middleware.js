import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { cookieName } from "../lib/utils/utils.js";

export const protectRoute = async (req, res, next) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    try {
        const token = req.cookies[cookieName];
        if (!token) {
            return res
                .status(401)
                .json({ message: "Unauthorized - No Tokken Found" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid Tokken Found" });
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (err) {
        console.log("ProtectRoute auth.middleware error: ", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
