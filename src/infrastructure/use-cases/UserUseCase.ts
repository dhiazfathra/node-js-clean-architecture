import { User } from "../../data/models/User";
import { UserRepository } from "../repositories/UserRepository";
import { schedule } from "../../adapters/agenda/jobs/Scheduler";
import agenda from "../../adapters/agenda/scheduler";
import { JobHandlers } from "../../adapters/agenda/jobs/Handlers";

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
    await schedule.sendBirthdayMail({ user });
    return this.userRepository.create(user);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  async getUser(email: string): Promise<User | null> {
    const userDocument = await this.userRepository.get(email);
    return userDocument ? this.mapUserDocumentToUser(userDocument) : null;
  }

  async deleteUser(email: string): Promise<User | null> {
    const deletedUserDocument = await this.userRepository.delete(email);

    if (deletedUserDocument) {
      const user = this.mapUserDocumentToUser(deletedUserDocument);
      agenda.cancel({ name: `send-birthday-mail-to-${user.email}` });
      return user;
    }
    return null;
  }

  async updateUser(
    email: string,
    updatedUser: Partial<User>
  ): Promise<User | null> {
    const updatedUserDocument = await this.userRepository.update(
      email,
      updatedUser
    );
    if (updatedUserDocument) {
      const user = this.mapUserDocumentToUser(updatedUserDocument);
      await schedule.sendBirthdayMail({ user });
      return user;
    }
    return null;
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
