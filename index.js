import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
dotenv.config({ path: ".env" });

app.use("/posts", postRoutes);
app.use("/", (req, res) => {
  res.send("Welcome to Memories API");
});
const CONNECTION_URL = process.env.MONGODB_CONNECTION_STRING;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Server running on port", PORT);
    })
  )
  .catch((error) => {
    console.log(error.message);
  });
