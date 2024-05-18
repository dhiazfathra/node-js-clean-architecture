import express from "express";
import { SampleController } from "../controllers/SampleController";
import { SampleUseCase } from "../../../infrastructure/use-cases/SampleUseCase";
import { SampleRepository } from "../../../infrastructure/repositories/SampleRepository";

export const sampleRoutes = express.Router();

const sampleRepository = new SampleRepository();
const sampleUseCase = new SampleUseCase(sampleRepository);
const sampleController = new SampleController(sampleUseCase);

sampleRoutes.post("/", async (req, res) =>
  sampleController.createSample(req, res)
);
sampleRoutes.get("/", async (req, res) =>
  sampleController.getAllSamples(req, res)
);
