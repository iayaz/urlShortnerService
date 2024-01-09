import express from "express";
import mongoose from "mongoose";
import urlRoutes from "./routes/url.js";
// Initialization
const app = express();
app.use(express.json());

const URI = "mongodb://localhost:27017/UrlShortner";

// Mounting the Routes
app.use("/url", urlRoutes);

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("DB Connection Failed:", err);
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
