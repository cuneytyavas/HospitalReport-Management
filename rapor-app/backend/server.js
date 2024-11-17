import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./db/connectToDB.js";
import authRoute from "./routes/auth.route.js";
import technicianRoute from "./routes/technician.route.js";
import recordRoute from "./routes/record.route.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import cloudinary from "cloudinary";

const app = express();
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());

//Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/technician", technicianRoute);
app.use("/api/v1/record", recordRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToDB();
});
