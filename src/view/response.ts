import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export class ResponseHelper {
  static success<T>(res: Response, message: string, data?: T, statusCode: number = 200): Response {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data
    };
    return res.status(statusCode).json(response);
  }

  static error(res: Response, message: string, error?: string, statusCode: number = 400): Response {
    const response: ApiResponse = {
      success: false,
      message,
      error
    };
    return res.status(statusCode).json(response);
  }

  static notFound(res: Response, message: string = 'Resource not found'): Response {
    return this.error(res, message, 'Not Found', 404);
  }

  static serverError(res: Response, message: string = 'Internal server error', error?: string): Response {
    return this.error(res, message, error, 500);
  }

  static created<T>(res: Response, message: string, data: T): Response {
    return this.success(res, message, data, 201);
  }
}