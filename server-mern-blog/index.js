import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";

import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";
import commentRoute from "./routes/comments.js";

const app = express();
dotenv.config();
// Constants
const PORT = 27017;
const DB_NAME = "blog";

// Middleware
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static("uploads"));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

async function start() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/api", {
      useNewUrlParser: true,
    })
    // await mongoose
    //   .connect(
    //     "mongodb://localhost:27017/api"
    //     // `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.pbuqiqy.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
    //   )
      .then((db) => console.log("DB is connected"))
      .catch((err) => console.log(err));

    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}
start();
