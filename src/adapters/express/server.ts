import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { sampleRoutes } from "./routes/SampleRoute";
import { ApiKeyMiddleware } from "./middleware/ApiKeyMiddleware";

const app = express();
const port = 3000;

// Express init
app.use(cors());
app.use(express.json());

app.all("/health", (_req, res) => {
  res.status(200).json({ message: "OK" });
});

app.use(ApiKeyMiddleware);

// Connect to MongoDB using Mongoose
let con_string_dev = "mongodb://localhost:27018/nodejsdb";
let con_string_pro = "mongodb://mongo_db_service:27017/nodejsdb";
mongoose.connect(
  process.env.NODE_ENV === "production" ? con_string_pro : con_string_dev
);

// Routes
app.use("/api/samples", sampleRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
