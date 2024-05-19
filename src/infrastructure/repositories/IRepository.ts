import { Document } from "mongoose";

interface IRepository<T extends Document> {
  create(entity: T): Promise<T>;
  getAll?(): Promise<T[]>;
  get?(id: string): Promise<T | null>;
  delete?(id: string): Promise<T | null>;
  update?(id: string, updatedEntity: Partial<T>): Promise<T | null>;
}

export default IRepository;
