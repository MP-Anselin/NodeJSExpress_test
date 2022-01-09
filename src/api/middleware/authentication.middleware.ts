import {NextFunction, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import {UserService} from '../tables/user/user.service';
import UserErrorException from "../httpErrorException/user";
import {DataStoredTokenInterface} from "../tables/authentification/interfaces";
import RequestUserInterface from "../tables/user/interfaces/requestUser.interface";

const AuthenticationMiddleware = async (request: RequestUserInterface, response: Response, next_f: NextFunction) => {
    const cookies = request.cookies;
    const userService = new UserService()
    if (cookies && cookies.Authorization) {
        const secret = <string>process.env.JWT_SECRET;
        try {
            const verificationResponse = jwt.verify(cookies.Authorization, secret) as DataStoredTokenInterface;
            const id = verificationResponse._id;
            const user = await userService.findOne({_id: id}, next_f);
            if (user) {
                request.user = user
                next_f();
            } else {
                next_f(new UserErrorException(<string>process.env.UNAUTHORIZED_CODE));
            }
        } catch (error) {
            next_f(new UserErrorException(<string>process.env.UNAUTHORIZED_CODE));
        }
    } else {
        next_f(new UserErrorException(<string>process.env.UNAUTHORIZED_CODE));
    }
}

export default AuthenticationMiddleware;