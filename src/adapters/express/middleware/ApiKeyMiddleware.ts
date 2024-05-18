import { Request, Response, NextFunction } from "express";

export const ApiKeyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers["api-key"];

  // Check if API key is present and valid (you may implement your own validation logic)
  if (!apiKey || apiKey !== "eyd28GYiwdH6YUsd7GUihga/BSOWjsgfOhwj290Rj1H=") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};
