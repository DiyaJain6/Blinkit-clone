import { Request, Response, NextFunction } from 'express';

// Standardized error response interface
export interface ErrorResponse {
    success: boolean;
    message: string;
    stack?: string;
    errors?: any;
}

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message || 'Internal Server Error';

    // Specific error types
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map((val: any) => val.message).join(', ');
    }

    if (err.name === 'CastError') {
        statusCode = 400;
        message = `Resource not found with id of ${err.value}`;
    }

    if (err.code === 11000) {
        statusCode = 400;
        message = 'Duplicate field value entered';
    }

    const response: ErrorResponse = {
        success: false,
        message,
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    };

    res.status(statusCode).json(response);
};
