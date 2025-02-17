import asyncHandler from "express-async-handler";
import User from "../../models/auth/userModel.js";
import genrateToken from "../../helpers/genrateToken.js";
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken";
import Token from "../../models/auth/Token.js";
import crypto from "node:crypto";
import hashToken from "../../helpers/hashToken.js";
import sendMail from "../../helpers/sendEmail.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // validation

  if (!name || !email || !password) {
    //400 Bad request
    res.status(400).json({ message: "All feilds are required" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be atleast 6 characters" });
  }

  // check if the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    // bad request
    return res.status(400).json({ message: "User already exists" });
  }

  // create user
  const user = await User.create({
    name,
    email,
    password,
  });

  //genrate token with user id
  const token = genrateToken(user._id);

  // send back the user and the token as a response to the client
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    sameSite: true,
    secure: true,
  });

  if (user) {
    const { _id, name, email, role, photo, bio, isVerified } = user;

    //201 created
    res.status(201).json({
      _id,
      name,
      email,
      role,
      photo,
      bio,
      isVerified,
      token,
    });
  } else {
    res.status(400).json({ message: "invalid user data" });
  }
});

// login user
export const loginUser = asyncHandler(async (req, res) => {
  // get the email and password from req.body
  const { email, password } = req.body;

  //validation
  if (!email || !password) {
    return res.status(400).json({ message: "all the fields are required" });
  }

  // check if user exists
  const userExists = await User.findOne({ email });

  if (!userExists) {
    return res.status(400).json({ message: "User not found, Register now!" });
  }

  // check if the password matches the hashed password in the database
  const isMatch = await bcrypt.compare(password, userExists.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Incorrect email/password" });
  }
  //genrate token with the user id
  const token = genrateToken(userExists._id);

  if (userExists && isMatch) {
    const { _id, name, email, role, photo, bio, isVerified } = userExists;

    // set the token in the cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: true,
      secure: true,
    });

    // send back the user and the token in the response to the client
    res.status(201).json({
      _id,
      name,
      email,
      role,
      photo,
      bio,
      isVerified,
      token,
    });
  } else {
    res.status(400).json({ message: "Incorrect email or password" });
  }
});

// logout user

export const logoutUser = await asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out!!" });
});

// get User
export const getUser = await asyncHandler(async (req, res) => {
  //get the user details from the token -----> exclude password

  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not Found" });
  }
});

export const updateUser = await asyncHandler(async (req, res) => {
  //get user details from the token ------> protect middleware
  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    //user properties to update
    const { name, bio, photo } = req.body;
    //update user properties
    user.name = name || user.name;
    user.bio = bio || user.bio;
    user.photo = photo || user.photo;

    const updated = await user.save();

    res.status(200).json({ updated });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// login staus
export const userLoginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not authorized, please login" });
  }
  //verify the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded) {
    return res.status(200).json(true);
  } else {
    return res.status(401).json(false);
  }
});

// email verifcation
export const verifyEmail = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  // if user exists
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // check if user is already verified
  if (user.isVerified) {
    return res.status(400).json({ message: "User is already verified" });
  }

  let token = await Token.findOne({ userId: user._id });

  // if token exists --> delete the token
  if (token) {
    await token.deleteOne();
  }

  // create a verification token using the user id --->
  const verificationToken = crypto.randomBytes(64).toString("hex") + user._id;

  // hast the verification token
  const hashedToken = hashToken(verificationToken);

  await new Token({
    userId: user._id,
    verificationToken: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  }).save();

  // verification link
  const verificationLink = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

  // send email
  const subject = "Email Verification - AuthKit";
  const send_to = user.email;
  const reply_to = "noreply@gmail.com";
  const template = "emailVerification";
  const send_from = process.env.USER_EMAIL;
  const name = user.name;
  const link = verificationLink;

  try {
    // order matters ---> subject, send_to, send_from, reply_to, template, name, url
    await sendMail(subject, send_to, reply_to, template, send_from, name, link);
    return res.json({ message: "Email sent" });
  } catch (error) {
    console.log("Error sending email: ", error);
    return res.status(500).json({ message: "Email could not be sent" });
  }
});

// verify user
export const verifyUser = asyncHandler(async (req, res) => {
  const { verificationToken } = req.params;

  if (!verificationToken) {
    return res.status(400).json({ message: "Invalid Verification token" });
  }

  // hash the verification token beacuse the token in the database is also hashed
  const hashedToken = hashToken(verificationToken);

  // find the user with the verification toklen
  const userToken = await Token.findOne({
    verificationToken: hashedToken,
    // check if the token is not expired
    expiresAt: { $gt: Date.now() },
  });
  // console.log(userToken);

  if (!userToken) {
    return res
      .status(400)
      .json({ message: "Invalid or Expired Verification token" });
  }

  // find user with the user id in the token
  const user = await User.findById(userToken.userId);

  if (user.isVerified) {
    return res.status(400).json({ message: "User is already verified" });
  }

  // update user to verified
  user.isVerified = true;
  await user.save();
  res.status(200).json({ message: "User Verified" });
});

//forgot password
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // check if the user exists
  const user = await User.findOne({ email });

  if (!user) {
    //404 not found
    return res.status(404).json({ message: "User not found" });
  }

  // see if reset token exists
  let token = await Token.findOne({ userId: user._id });

  // if token exists ----> delete the token
  if (token) {
    await token.deleteOne();
  }

  // create a reset token using the user id ----> expires in 1 hour
  const passwordResetToken = crypto.randomBytes(64).toString("hex") + user._id;

  // hash the reset token
  const hashedToken = hashToken(passwordResetToken);

  await new Token({
    userId: user._id,
    passwordResettoken: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 60 * 60 * 1000,
  }).save();

  // reset link
  const resetLink = `${process.env.CLIENT_URL}/reset-password/${passwordResetToken}`;

  // send email to user
  const subject = "Reset Password - Task Manaager";
  const send_to = user.email;
  const reply_to = "noreply@gmail.com";
  const template = "forgotPassword";
  const send_from = process.env.USER_EMAIL;
  const name = user.name;
  const link = resetLink;

  try {
    await sendMail(subject, send_to, reply_to, template, send_from, name, link);
    return res.json({ message: "Email sent" });
  } catch (error) {
    console.log("Error sending messaage: ", error);
    return res.status(500).json({ message: "Email could not be sent" });
  }
});

// reset password
export const resetPassword = asyncHandler(async (req, res) => {
  const { resetPasswordToken } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }
  //hash the token
  const hashedToken = hashToken(resetPasswordToken);
  // check if the token exists and is not expired
  const userToken = await Token.findOne({
    passwordResettoken: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    return res.status(400).json({ message: "Invalid or expired reset token" });
  }
  //find user id in the token
  const user = await User.findById(userToken.userId);
  //update the user password
  user.password = password;
  await user.save();

  res.status(200).json({ message: "Password reset successfully" });
});
