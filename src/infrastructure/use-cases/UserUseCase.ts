import { User } from "../../data/models/User";
import { UserRepository } from "../repositories/UserRepository";

export class UserUseCase {
  constructor(private userRepository: UserRepository) {}

  async createUser(
    email: string,
    fullName: string,
    dateOfBirth: Date,
    timezoneOffset: number
  ): Promise<User> {
    const user: User = {
      email,
      fullName,
      dateOfBirth,
      timezoneOffset,
    };
    return this.userRepository.create(user);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  async getUser(email: string): Promise<User | null> {
    const userDocument = await this.userRepository.get(email);
    console.log(userDocument);
    return userDocument ? this.mapUserDocumentToUser(userDocument) : null;
  }

  async deleteUser(email: string): Promise<User | null> {
    const deletedUserDocument = await this.userRepository.delete(email);
    return deletedUserDocument
      ? this.mapUserDocumentToUser(deletedUserDocument)
      : null;
  }

  async updateUser(
    email: string,
    updatedUser: Partial<User>
  ): Promise<User | null> {
    const updatedUserDocument = await this.userRepository.update(
      email,
      updatedUser
    );
    return updatedUserDocument
      ? this.mapUserDocumentToUser(updatedUserDocument)
      : null;
  }

  private mapUserDocumentToUser(userDocument: any): User {
    return {
      email: userDocument.email,
      fullName: userDocument.fullName,
      dateOfBirth: userDocument.dateOfBirth,
      timezoneOffset: userDocument.timezoneOffset,
    };
  }
}
