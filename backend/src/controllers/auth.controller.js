import { compare, genSalt, hash } from "bcryptjs";
import User from "../models/user.model.js";
import { cookieName, genToken } from "../lib/utils/utils.js";
import cloudinary from "../lib/cloudinary/cloudinary.js";

export const signup = async (req, res) => {
    const { email, fullname, password, avatar } = req.body;
    const PASSWORD_LEN = 6;

    try {
        if (!email || !fullname || !password) {
            return res.status(400).json({
                message: "Email, Fullname, Password are required",
            });
        }
        if (password.length < PASSWORD_LEN) {
            return res.status(400).json({
                message: "Password must be 6 or more characters",
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
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

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        genToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            email: user.email,
            fullname: user.fullname,
            avatar: user.avatar,
        });
    } catch (err) {
        console.log("Signin auth.controller error: ", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const signout = (req, res) => {
    try {
        res.cookie(cookieName, "", { maxAge: 0 });
        res.status(200).json({ message: "Sign out successfully" });
    } catch (err) {
        console.log("Signout auth.controller error: ", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { avatar } = req.body;
        const userId = req.user._id;
        if (!avatar) {
            return res.status(400).json({ message: "User avatar required" });
        }
        const uploaded = await cloudinary.uploader.upload(avatar);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                avatar: uploaded.secure_url,
            },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        console.log("UpdateProfile auth.controller error: ", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const verifyAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (err) {
        console.log("VerifyAuth auth.controller error: ", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
