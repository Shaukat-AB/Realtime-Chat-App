import { genSalt, hash } from "bcryptjs";
import User from "../models/user.model.js";
import { genToken } from "../lib/utils/utils.js";

export const signup = async (req, res) => {
    const { email, fullname, password, avatar } = req.body;
    const PASSWORD_LEN = 6;

    try {
        if (!email || !fullname || !password) {
            res.status(400).json({
                message: "Email, Fullname, Password are required",
            });
        }
        if (password.length < PASSWORD_LEN) {
            res.status(400).json({
                message: "Password must be 6 or more characters",
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ message: "Email already exists" });
        }

        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        const newUser = await User({
            email,
            fullname,
            password: hashedPassword,
            avatar,
        });

        if (newUser) {
            genToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                fullname: newUser.fullname,
                avatar: newUser.avatar,
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (err) {
        console.log("Signup auth.controller error: ", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const signin = (req, res) => {
    res.send("signin route");
};

export const signout = (req, res) => {
    res.send("signout route");
};
