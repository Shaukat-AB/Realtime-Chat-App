import { compare, genSalt, hash } from 'bcryptjs';
import User from '../models/user.model.js';
import { cookieName, genToken, newError } from '../lib/utils/utils.js';
import cloudinary from '../lib/cloudinary/cloudinary.js';
import { safeNewUserParse } from '../lib/zod/zod.js';

export const signup = async (req, res, next) => {
  const { email, fullname, password, avatar } = req.body;

  try {
    const result = safeNewUserParse(req.body);
    if (!result.success) throw newError(result.message, 400);

    const user = await User.findOne({ email });
    if (user) throw newError('Email already exists', 400);

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const newUser = await User({
      email,
      fullname,
      password: hashedPassword,
      avatar,
    });

    if (!newUser) throw newError('Invalid user data', 400);

    genToken(newUser._id, res);
    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      fullname: newUser.fullname,
      avatar: newUser.avatar,
    });
  } catch (err) {
    console.log('Signup auth.controller error: ', err.message);
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) throw newError('Invalid credentials', 400);

    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) throw newError('Invalid credentials', 400);

    genToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      email: user.email,
      fullname: user.fullname,
      avatar: user.avatar,
    });
  } catch (err) {
    console.log('Signin auth.controller error: ', err.message);
    next(err);
  }
};

export const signout = (req, res, next) => {
  try {
    res.cookie(cookieName, '', { maxAge: 0 });
    res.status(200).json({ message: 'Sign out successfully' });
  } catch (err) {
    console.log('Signout auth.controller error: ', err.message);
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const userId = req.user._id;

    if (!avatar) throw newError('User avatar required', 400);

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
    console.log('UpdateProfile auth.controller error: ', err.message);
    next(err);
  }
};

export const verifyAuth = (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    console.log('VerifyAuth auth.controller error: ', err.message);
    next(err);
  }
};
