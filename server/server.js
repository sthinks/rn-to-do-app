import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/project.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const dbHost = process.env.MONGO_URL;

mongoose
  .connect(dbHost, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB bağlantısı başarılı"))
  .catch((err) => console.error("MongoDB bağlantı hatası:", err));

app.use("/auth", authRoutes);
app.use("/project", projectRoutes);

app.listen(3000, () => {
  console.log("Sunucu çalışıyor: http://localhost:3000");
});
