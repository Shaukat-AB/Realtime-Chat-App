import express from "express";
import {
    signin,
    signout,
    signup,
    updateProfile,
    verifyAuth,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/signout", signout);

router.put("/profile/update", protectRoute, updateProfile);
router.get("/profile/verify", protectRoute, verifyAuth);

export default router;
