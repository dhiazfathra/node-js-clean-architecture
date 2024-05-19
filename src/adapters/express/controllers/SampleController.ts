import { Request, Response } from "express";
import { SampleUseCase } from "../../../infrastructure/use-cases/SampleUseCase";

export class SampleController {
  private sampleUseCase: SampleUseCase;

  constructor(sampleUseCase: SampleUseCase) {
    this.sampleUseCase = sampleUseCase;
  }

  async createSample(req: Request, res: Response): Promise<void> {
    try {
      const { name, description } = req.body;
      const newData = await this.sampleUseCase.createSample(name, description);
      const result = {
        status: "OK",
        message: "Successfully created",
        sample: newData,
      };
      res.status(201).json(result);
    } catch (error) {
      console.error("Error creating user:", error);
      res
        .status(500)
        .json({ status: "Error", message: "Internal Server Error" });
    }
  }

  async getAllSamples(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.sampleUseCase.getAllSamples();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      res
        .status(500)
        .json({ status: "Error", message: "Internal Server Error" });
    }
  }
}
