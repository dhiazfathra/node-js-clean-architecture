import mongoose, { Schema, Document } from "mongoose";
import { User } from "../../data/models/User";
import IRepository from "./IRepository";

interface IUserDocument extends Document, User {}

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true, index: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  timezoneOffset: { type: Number, required: true },
});

const UserModel = mongoose.model<IUserDocument>("User", UserSchema);

export class UserRepository implements IRepository<IUserDocument> {
  async create(user: User): Promise<IUserDocument> {
    const newUser = new UserModel(user);
    return await newUser.save();
  }

  async getAll(): Promise<IUserDocument[]> {
    const users = await UserModel.find();
    return users;
  }

  async get(email: string): Promise<IUserDocument | null> {
    const user = await UserModel.findOne({ email });
    return user;
  }

  async delete(email: string): Promise<IUserDocument | null> {
    const deletedUser = await UserModel.findOneAndDelete({ email });
    return deletedUser;
  }

  async update(
    email: string,
    updatedUser: Partial<User>
  ): Promise<IUserDocument | null> {
    const user = await UserModel.findOneAndUpdate({ email }, updatedUser, {
      new: true,
    });
    return user;
  }
}
