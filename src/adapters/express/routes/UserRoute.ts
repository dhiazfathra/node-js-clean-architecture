import express from "express";
import { UserController } from "../controllers/UserController";
import { UserUseCase } from "../../../infrastructure/use-cases/UserUseCase";
import { UserRepository } from "../../../infrastructure/repositories/UserRepository";

export const userRoutes = express.Router();

const userRepository = new UserRepository();
const userUseCase = new UserUseCase(userRepository);
const userController = new UserController(userUseCase);

userRoutes.post("/", async (req, res) => userController.createUser(req, res));
userRoutes.get("/", async (req, res) => userController.getUser(req, res));
userRoutes.delete("/", async (req, res) => userController.deleteUser(req, res));
userRoutes.put("/", async (req, res) => userController.updateUser(req, res));
