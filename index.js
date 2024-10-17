import express from "express";
import { connectDB } from "./db.js";
import urlRoute from "./routes/url.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();

const PORT = process.env.PORT;

//db connection
connectDB()
  .then(() => {
    console.log("Mongodb is Up and Running");
  })
  .catch((err) => {
    console.log("Error in running Mongodb: ", err);
  });

// middlewares
app.use(express.json());

// route
app.use("/api/url", urlRoute);

// Server
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
