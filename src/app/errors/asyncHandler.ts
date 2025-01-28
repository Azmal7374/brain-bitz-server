/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { Request, Response, NextFunction } from 'express';

// Utility to handle async route handlers
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next); // Catch any unhandled errors
  };
};
