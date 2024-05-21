const express = require("express");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a user
const registerUser = async (req, res) => {
  try {
    const findIfUserExist = await User.findOne({ email: req.body.email });
    if (findIfUserExist) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }
    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    // Create a new User
    const addUser = new User(req.body);
    await addUser.save();
    // Send the response to the client
    res.status(201).json({
      success: true,
      message: "User added successfully",
      addUser: addUser,
    });
  } catch (err) {
    res.json({ message: err.message });
  }
};

// Login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const PersonExist = await User.findOne({ email: email });
      if (!PersonExist) {
        return res.json({ message: "User does not exist" });
      }
      // Check if the password matches
      const isMatch = await bcrypt.compare(password, PersonExist.password);
      if (!isMatch) {
        return res.json({ message: "Password is incorrect" });
      }
      // Generate the token
      const token = jwt.sign({ userId: PersonExist._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      res.status(200).json({
        success: true,
        message: "Person logged in successfully",
        Person: PersonExist,
        token: token,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Get logged in user's details
  const getLoggedInUser = async (req, res) => {
    try {
        const user = await User.findById(req.body.userId );
        if (!user) {
          throw new Error("User not found");
        }
        // if(user.name !== "Adedeji222"){
        //   throw new Error("This is not you");
        // }
        res.status(200).json({
          success: true,
          message: "User fetched successfully",
          user: user,
        });
      } catch (err) {
        return res.json({ message: err.message });
      }
  };

  // Fetch all users
const getAllUsers = async (req, res) => {
  try{
      const users = await User.find();
      return res.status(200).json({
          success: true,
          users: users,
      });
  }
  catch(err){
      return res.status(500).json({message: err.message});
  }
};

module.exports = {registerUser, loginUser, getLoggedInUser, getAllUsers}