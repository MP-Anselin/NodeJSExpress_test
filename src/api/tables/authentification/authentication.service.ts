import * as bcrypt from "bcryptjs";
import {UserService} from "../user/user.service";
import createUserDto from "../user/dto/createUser.dto";
import {NextFunction} from "express";
import TokenDataInterface from "./interfaces/token.interface";
import {UserInterface} from "../user/interfaces";
import {jwtToken} from '../../services/token'
import {logger} from "../../logger";
import {LogInDto} from "./dto";
import {FORBIDDEN} from "../../utils/macro.globals";
import { HttpErrorException } from "../../httpErrorException";
import UserResponse from "./dto/UserResponse.dto";

export class AuthenticationService {
    constructor(private userService: UserService = new UserService()) {
    }

    async signUp(registrationIForm: createUserDto, next_f: NextFunction) {
        registrationIForm.password = await bcrypt.hash(registrationIForm.password, 10)
        const user = await this.userService.create(registrationIForm, next_f)
        if (!user)
            return
        const tokenData = await AuthenticationService.createToken(user)
        const cookie = AuthenticationService.createCookie(tokenData)
        logger.info("Route: Authentication => sign up a user");
        return {cookie, user: new  UserResponse(user)}
    }

    async logIn(userCheckPWD: UserInterface, next_f: NextFunction) {
        const logInData: LogInDto = userCheckPWD;
        const userData = await this.userService.findOne({email: userCheckPWD.email}, next_f)
        if (!userData) {
            return
        }
        if (await bcrypt.compare(logInData.password, userData.get('password', null, {getters: false}))) {
            const tokenData = await AuthenticationService.createToken(userData);
            const cookie = AuthenticationService.createCookie(tokenData)
            if (await this.userService.updateInfo({isLog: true}, {_id: userData._id}, next_f)) {
                logger.info("Route: Authentication => log in a user");
                return {cookie, user: new UserResponse(userData)}
            }
            return
        }
        logger.error("Route: Authentication => [error] log in a user");
        next_f(new HttpErrorException(FORBIDDEN))
    }

    async logOut(_id: string, next_f: NextFunction) {
        const user = await this.userService.logOut(_id, next_f)
        if (user) {
            logger.info("Route: Authentication => log out a user");
            return user
        }
        logger.error("Route: Authentication => [error] log out a user");
    }

    private static createCookie(tokenData: TokenDataInterface) {
        return {Authorization: tokenData.token, MaxAge: tokenData.expiresIn}
    }

    private static async createToken(user: UserInterface): Promise<TokenDataInterface> {
        return jwtToken(user._id)
    }
}
