import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { sampleRoutes } from "./routes/SampleRoute";
import { ApiKeyMiddleware } from "./middleware/ApiKeyMiddleware";
import { userRoutes } from "./routes/UserRoute";
import { mongoConnectionString } from "../../data/constants/Config";
const app = express();
const port = 3000;

// Express init
app.use(cors());
app.use(express.json());

app.all("/health", (_req, res) => {
  res.status(200).json({ message: "OK" });
});

// Uncomment to turn on API key middleware
// app.use(ApiKeyMiddleware);

// Connect to MongoDB using Mongoose
mongoose.connect(mongoConnectionString);

// Routes
app.use("/api/samples", sampleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
