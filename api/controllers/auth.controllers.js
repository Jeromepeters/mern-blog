import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import errorHandler from "../utils/error.js";
export const signUp = (req, res, next) => {
  console.log(req.body);
  console.log("im in signUp");
  console.log("password", req.body.password);
  const { username, email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);
  console.log(hashPassword);
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandler(400, "Please provide all the required fields"));
  }
  try {
    User.create({ username, email, password: hashPassword }).then((user) => {
      console.log(user);
      const { password, ...userData } = user._doc;
      console.log(userData);
      return res.status(201).json({
        message: "User created successfully",
        userData,
      });
    });
  } catch (error) {
    next();
  }
};

export const signIn = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return next(errorHandler(400, "Invalid password"));
    }
    const { _id, username, email } = user;
    return res.status(200).json({
      message: "User logged in successfully",
      user,
    });
  });
};
