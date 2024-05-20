import { Request, Response } from "express";
import { UserUseCase } from "../../../infrastructure/use-cases/UserUseCase";
import { User } from "../../../data/models/User";
import Joi from "joi";

export class UserController {
  private userUseCase: UserUseCase;

  constructor(userUseCase: UserUseCase) {
    this.userUseCase = userUseCase;
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      firstName: Joi.string().min(3).max(30).required(),
      lastName: Joi.string().min(3).max(30).required(),
      dateOfBirth: Joi.date().iso().required(),
      timezoneOffset: Joi.number().integer().required(),
    });

    try {
      const { error, value } = schema.validate(req.body);

      if (error) {
        return res
          .status(400)
          .json({ status: "Error", message: error.details[0].message });
      }

      const { email, firstName, lastName, dateOfBirth, timezoneOffset } = value;

      const birthDate = new Date(dateOfBirth);
      const tzAdjustedBirthDate = new Date(
        birthDate.getTime() - timezoneOffset * 60000 // Convert minutes to milliseconds
      );

      const newData = await this.userUseCase.createUser(
        email,
        firstName,
        lastName,
        tzAdjustedBirthDate,
        timezoneOffset
      );
      const result = {
        status: "Created",
        message: "Successfully created",
        user: newData,
      };
      return res.status(201).json(result);
    } catch (error) {
      console.error("Error creating user:", error);
      return res
        .status(500)
        .json({ status: "Error", message: "Internal Server Error" });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const data = await this.userUseCase.getAllUsers();
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      return res
        .status(500)
        .json({ status: "Error", message: "Internal Server Error" });
    }
  }

  async getUser(req: Request, res: Response): Promise<Response> {
    try {
      const userEmail: string = req.query.email as string;
      if (!userEmail) {
        return res
          .status(400)
          .json({ status: "Bad Request", message: "Email is required" });
      }

      const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userEmail)) {
        return res
          .status(400)
          .json({ status: "Bad Request", message: "Invalid email format" });
      }

      const user = await this.userUseCase.getUser(userEmail);
      if (user) {
        return res.status(200).json(user);
      } else {
        return res
          .status(404)
          .json({ status: "Not Found", message: "User not found" });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      return res
        .status(500)
        .json({ status: "Error", message: "Internal Server Error" });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const userEmail: string = req.query.email as string;
      if (!userEmail) {
        return res
          .status(400)
          .json({ status: "Bad Request", message: "Email is required" });
      }

      const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userEmail)) {
        return res
          .status(400)
          .json({ status: "Bad Request", message: "Invalid email format" });
      }

      const deletedUser = await this.userUseCase.deleteUser(userEmail);
      if (deletedUser) {
        return res.status(204).json({
          status: "No Content",
          message: "User deleted",
          user: deletedUser,
        });
      }
      return res
        .status(404)
        .json({ status: "Not Found", message: "User not found" });
    } catch (error) {
      console.error("Error deleting user:", error);
      return res
        .status(500)
        .json({ status: "Error", message: "Internal Server Error" });
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const userEmail: string = req.body.email as string;
      if (!userEmail) {
        return res
          .status(400)
          .json({ status: "Bad Request", message: "Email is required" });
      }

      const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userEmail)) {
        return res
          .status(400)
          .json({ status: "Bad Request", message: "Invalid email format" });
      }

      const updatedUser: Partial<User> = req.body;
      const result = await this.userUseCase.updateUser(userEmail, updatedUser);
      if (result) {
        return res
          .status(200)
          .json({ status: "OK", message: "User updated", user: result });
      } else {
        return res
          .status(404)
          .json({ status: "Not Found", message: "User not found" });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      return res
        .status(500)
        .json({ status: "Error", message: "Internal Server Error" });
    }
  }
}
