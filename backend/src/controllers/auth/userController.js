import asyncHandler from "express-async-handler";
import User from "../../models/auth/userModel.js";
import genrateToken from "../../helpers/genrateToken.js";
import bcrypt from "bcrypt";

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
