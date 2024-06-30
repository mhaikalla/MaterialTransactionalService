import { Request, Response, NextFunction } from 'express';
import {ResponseBuilder,HttpResponse } from '../utils/ApiJsonResponse';
import {Transactionals} from '../models/index';
import { config as dotenv } from 'dotenv';
var jwt = require('jsonwebtoken');

export const verifyTokenAuthenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const headerString = req.headers.Authorization || req.headers.authorization;
  if (!headerString) {
    return ResponseBuilder.unauthorized("Empty Token Access");
  }

  const secretKey = process.env.JWT_SECRET_KEY || "";
  let token = '';
  if (typeof headerString == 'string') {
    token = headerString.split(' ')[1];
  }
  
  try {
    const credential: string | object = jwt.verify(token, secretKey);
    if (credential) {
      req.app.locals.credential = credential;
      return next();
    }
    return ResponseBuilder.unauthorized("Invalid Token Access");
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      const errorMessage = error || 'Unauthorized';
      return ResponseBuilder.unauthorized(errorMessage as string);
    }
    return next(error);
  }
};
