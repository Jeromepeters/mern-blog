import express from "express";
import auth from "./routes/auth.routes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/api/post", (req, res) => {
  console.log(req.body);
  res.send("post");
});
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI; // Replace with your connection details
    await mongoose.connect(uri);
    console.log(`MongoDB connected successfully!`);
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err}`);
    process.exit(1);
  }
};

connectDB();

app.use("/api/auth", auth);
app.use((err, req, res, next) => {
  res.status(err.status).json({
    success: false,
    message: err.message,
  });
  next();
});

app.listen(3000, () => {
  console.log("listening to 3000...");
});
