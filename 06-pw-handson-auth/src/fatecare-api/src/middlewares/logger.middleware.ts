import { RequestHandler, Request, Response, NextFunction } from 'express';

export const loggerMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);

  next(); 
};