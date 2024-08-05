import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "./db.js";
import User from "./models/User.js";
dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});

app.get("/info", (req, res) => {
  res.status(200).send({
    body: "Hello World",
  });
  console.log("Response sent successfully!");
});

app.post("/register", async (req, res) => {
  console.log(
    "This is the user received : " +
      req.body.username +
      " and this is the password : " +
      req.body.password +
      " and this is the mail :" +
      req.body.email
  );

  const req_username = req.body.username;
  const req_userpass = req.body.password;
  const req_email = req.body.email;
  const hashedPassword = await bcrypt.hash(req_userpass, 10);
  const newUser = new User({
    username: req_username,
    email: req_email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    const user = await User.findOne({ username: req_username });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.log("This is the registration error : ", error);
    res.status(400).json("Invalid Credentials!");
  }
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  console.log(
    "This is the user received : " +
      req.body.username +
      " and this is the password : " +
      req.body.password
  );
  const req_username = req.body.username;
  const req_userpass = req.body.password;

  if (!req_username || !req_userpass) {
    res.status(400).json("Username or Password not present.");
  }
  const user = await User.findOne({ username: req_username });
  console.log("this is the user: " + user);
  if (user && (await bcrypt.compare(req_userpass, user.password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } else {
    res.status(400).send("Invalid credentials");
  }
});

app.get("/home", (req, res) => {
  const token = req.headers["authorization"];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({
      data: "List of items",
    });
  } catch (e) {
    res.status(403).json({
      data: "Token Expired Login Again!",
    });
  }
});
