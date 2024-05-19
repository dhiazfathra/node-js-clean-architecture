import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { sampleRoutes } from "./routes/SampleRoute";
import { userRoutes } from "./routes/UserRoute";
import { mongoConnectionString } from "../../data/constants/Config";
const app = express();
const port = 3000;

// Express init
app.use(cors());
app.use(express.json());

app.all("/api/v1/health", (_req, res) => {
  res.status(200).json({ message: "OK" });
});

// Connect to MongoDB using Mongoose
mongoose.connect(mongoConnectionString);

// Routes
app.use("/api/v1/samples", sampleRoutes);
app.use("/api/v1/user", userRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
