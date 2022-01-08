import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import {NextFunction, RequestHandler} from 'express';
import {HttpErrorException} from '../httpErrorException';

const ValidationUserMiddleware = <T>(type: any, skipMissingProperties = false): RequestHandler => {
    return (req, res, next_f: NextFunction) => {
        validate(plainToClass(type, req.body), { skipMissingProperties })
            .then((errors: ValidationError[]) => {
                if (errors.length > 0) {
                    const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
                    const code = parseInt(<string>process.env.BAD_REQUEST_CODE)
                    next_f(new HttpErrorException(code, message));
                } else {
                    next_f();
                }
            });
    };
}

export default ValidationUserMiddleware;