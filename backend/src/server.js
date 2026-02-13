import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";


import connectDB from "./config/db.js";

// routes
import authRoutes from "./routes/auth.routes.js";
import patientRoutes from "./routes/patient.routes.js";
import visitRoutes from "./routes/visit.routes.js";

dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


// database
connectDB();

// routes
app.use("/auth", authRoutes);
app.use("/patients", patientRoutes);
app.use("/visits", visitRoutes);

// test route (optional but useful)
app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
