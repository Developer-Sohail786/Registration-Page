import express from "express";
import cors from "cors"; //for saving cors issue policy
import mongoose from "mongoose"; //importing database
import User from "../models/User.js"; //importing dataBase Schema
import bcrypt from "bcrypt"; //importing bcrypt library for hashing to improve security

const app = express();
const port = 3000;

// ✅ Allow requests from your frontend (Vite default: 5173)
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// ✅ Parse JSON body
app.use(express.json());

// connecting database

const connection = await mongoose.connect("mongodb://localhost:27017/User"); //if want then send it to userData 

// Route 1
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Route 2
app.post("/", async(req, res) => {
  try{
  console.log("➡️ Received data:", req.body);
  const plainPassword=req.body.password //getting plain password from frontend
  const hashedPassword= await bcrypt.hash(plainPassword,10); //hasing the plain password for improving security
  const newUser = new User({
    email:req.body.email,
    password:hashedPassword,
  });
  await newUser.save()
  res.json({ message: "Form received successfully!" });
  }
  catch(err){
console.log("Error in saving User data", err);
res.status(500).json({message:"Interal server error"})

  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Backend running at http://localhost:${port}`);
});
