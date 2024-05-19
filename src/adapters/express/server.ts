import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { sampleRoutes } from "./routes/SampleRoute";
import { ApiKeyMiddleware } from "./middleware/ApiKeyMiddleware";
import { userRoutes } from "./routes/UserRoute";
import Agenda from "agenda";

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
let con_string_dev = "mongodb://localhost:27018/nodejsdb";
let con_string_pro = "mongodb://mongo_db_service:27017/nodejsdb";
let mongoConnectionString =
  process.env.NODE_ENV === "production" ? con_string_pro : con_string_dev;
mongoose.connect(mongoConnectionString);

// Init Singleton Agenda
const agenda = new Agenda({
  db: {
    address: mongoConnectionString,
    collection: "agendaJobs",
  },
});
agenda
  .on("ready", () => console.log("Agenda started!"))
  .on("error", () => console.log("Agenda connection error!"));

// Routes
app.use("/api/samples", sampleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
