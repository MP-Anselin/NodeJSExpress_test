import {NextFunction, Request, Response} from 'express';
import Controller from "../controller";
import {UserService} from "./user.service";
import {AuthenticationMiddleware} from "../../middleware";
import RequestUserInterface from "./interfaces/requestUser.interface";
import UserResponse from "../authentification/dto/UserResponse.dto";
import {UpdateFriendDto} from "../friend/dto";
import {UpdateUserDto} from "./dto";

export class UserController extends Controller {
    constructor(private readonly userService: UserService = new UserService()) {
        super('/user')
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router
            .get(`${this.path}s`, AuthenticationMiddleware, this.getAllUser)
            .get(`${this.path}`, AuthenticationMiddleware, this.getUserInfo)
            .get(`${this.path}/commands/:id`, AuthenticationMiddleware, this.getAllUserCommands)
            .patch(`${this.path}`, AuthenticationMiddleware, this.updateUserData)
            .get(`${this.path}/products/:id`, AuthenticationMiddleware, this.getAllUserProducts)
    }

    private getAllUser = async (request: Request, response: Response) => {
        const result = await this.userService.findAll();
        const correctAnswer = result.map((el) => {
            return new UserResponse(el);
        })
        response.send(correctAnswer);
    }

    private getUserInfo = async (request: RequestUserInterface, response: Response, next_f: NextFunction) => {
        const userId = request.user?._id;
        const result = await this.userService.findOne({_id: userId}, next_f);
        response.send(new UserResponse(result))
    }

    private updateUserData = async (request: RequestUserInterface, response: Response, next_f: NextFunction) => {
        const userInfoData: UpdateUserDto = request.body;
        let userId =  request.user?._id ? request.user._id : "";
        const result = await this.userService.updateInfo(userInfoData, {_id: userId}, next_f)
        if (result)
            response.send(result)
    }

    private getAllUserCommands = async (request: Request, response: Response, next_f: NextFunction) => {
        const result = await this.userService.findAllCommands(request.params.id, next_f);
        if (result)
            response.send(result)
    }

    private getAllUserProducts = async (request: Request, response: Response, next_f: NextFunction) => {
        const result = await this.userService.findAllProducts(request.params.id, next_f);
        if (result)
            response.send(result)
    }
}
