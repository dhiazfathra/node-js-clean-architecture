import mongoose, { Schema, Document } from "mongoose";
import { Sample } from "../../data/models/Sample";
import IRepository from "./IRepository";

interface ISampleDocument extends Document, Sample {}

const SampleSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
});

const SampleModel = mongoose.model<ISampleDocument>("Sample", SampleSchema);

export class SampleRepository implements IRepository<ISampleDocument> {
  async add(sample: Sample): Promise<ISampleDocument> {
    const newSample = new SampleModel(sample);
    return await newSample.save();
  }

  async getAll(): Promise<ISampleDocument[]> {
    const samples = await SampleModel.find();
    return samples;
  }
}
