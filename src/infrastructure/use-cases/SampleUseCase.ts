import { Sample } from "../../data/models/Sample";
import { SampleRepository } from "../repositories/SampleRepository";

export class SampleUseCase {
  constructor(private sampleRepository: SampleRepository) {}

  async createSample(name: string, description: string): Promise<Sample> {
    const sample: Sample = {
      name,
      description,
    };
    return this.sampleRepository.create(sample);
  }

  async getAllSamples(): Promise<Sample[]> {
    return this.sampleRepository.getAll();
  }
}
