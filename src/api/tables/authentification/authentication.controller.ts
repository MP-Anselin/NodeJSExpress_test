import {Request, Response, NextFunction} from 'express';
import Controller from "../controller";
import {AuthenticationService} from "./authentication.service";
import CreateUserDto from "../user/dto/createUser.dto";
import {ValidationUserMiddleware} from "../../middleware";
import {LogInDto} from "./dto";
import AuthenticationMiddleware from "../../middleware/authentication.middleware";
import RequestUserInterface from "../user/interfaces/requestUser.interface";
import UserResponse from "./dto/UserResponse.dto";

export class AuthenticationController extends Controller {
    constructor(private readonly authenticationService: AuthenticationService = new AuthenticationService()) {
        super('/user/auth')
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/signup`, ValidationUserMiddleware(CreateUserDto), this.signUp)
            .post(`${this.path}/login`, ValidationUserMiddleware(LogInDto), this.logIn)
            .post(`${this.path}/logout`, AuthenticationMiddleware, this.logOut)
    }

    private signUp = async (request: Request, response: Response, next_f: NextFunction): Promise<void> => {
        const userData: CreateUserDto = request.body;
        const result = await this.authenticationService.signUp(userData, next_f);
        if (result) {
            AuthenticationController.setCookie(response, result)
        }
    }

    private logIn = async (request: Request, response: Response, next_f: NextFunction): Promise<void> => {
        const result = await this.authenticationService.logIn(request.body, next_f)
        if (result) {
            AuthenticationController.setCookie(response, result)
        }
    }

    private logOut = async (request: RequestUserInterface, response: Response, next_f: NextFunction) => {
        const userId = request.user?._id
        if (userId) {
            const result = await this.authenticationService.logOut(userId, next_f)
            if (result) {
                response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
                response.cookie('Authorization', '');
                response.cookie('Max-Age', 0);
                response.send(result);
            }
        }
    }

    private static setCookie(response: Response, result: any) {
        const {cookie, user} = result
        response.setHeader('Set-Cookie', ['HttpOnly']);
        response.cookie('Authorization', cookie.Authorization);
        response.cookie('Max-Age', cookie.MaxAge);

        response.send(new UserResponse(user));
    }
}
