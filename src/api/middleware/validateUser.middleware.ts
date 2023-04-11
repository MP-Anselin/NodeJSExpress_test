import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import {NextFunction, RequestHandler} from 'express';
import {HttpErrorException} from '../httpErrorException';
import {BAD_REQUEST} from "../utils/macro.globals";

const ValidationUserMiddleware = <T>(type: any, skipMissingProperties = false): RequestHandler => {
    return (req, res, next_f: NextFunction) => {
        validate(plainToClass(type, req.body), { skipMissingProperties })
            .then((errors: ValidationError[]) => {
                if (errors.length > 0) {
                    const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
                    next_f(new HttpErrorException(BAD_REQUEST, message));
                } else {
                    next_f();
                }
            });
    };
}

export default ValidationUserMiddleware;
