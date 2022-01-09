import {NextFunction, Request, Response} from 'express';
import {HttpErrorException} from '../httpErrorException';

const ErrorHandlingMiddleware = (error: HttpErrorException, request: Request, response: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message || 'The server could not answer';
    response
        .status(status)
        .send({
            message,
            status,
        });
}

export default ErrorHandlingMiddleware;