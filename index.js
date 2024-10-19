import express from "express";
import { connectDB } from "./db.js";
import urlRoute from "./routes/url.js";
import staticRoute from './routes/staticRouter.js';
import dotenv from "dotenv";
import path from "path";

const app = express();

dotenv.config();

const PORT = process.env.PORT;

// setting the view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

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
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))

// route
app.use("/api/url", urlRoute);
//static router
app.use('/',staticRoute);

// Server
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
