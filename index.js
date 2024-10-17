import express from "express";
import { connectDB } from "./db.js";
import urlRoute from "./routes/url.js";

const app = express();
const PORT = 3000;

//db connection
connectDB()
  .then(() => {
    console.log("Mongodb is Up and Running");
  })
  .catch((err) => {
    console.log("Error in running mongodb");
  });

// middlewares
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.end("hello");
});


app.use("/api/url", urlRoute);

// Server
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
