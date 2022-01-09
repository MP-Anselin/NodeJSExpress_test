import {NextFunction, Request, Response} from 'express';
import Controller from "../controller";
import {UserService} from "./user.service";
import {AuthenticationMiddleware} from "../../middleware";

export class UserController extends Controller {
    constructor(private readonly userService: UserService = new UserService()) {
        super('/user')
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}s`, AuthenticationMiddleware, this.getAllUser)
            .get(`${this.path}/commands/:id`, AuthenticationMiddleware, this.getAllUserCommands)
            .get(`${this.path}/products/:id`, AuthenticationMiddleware, this.getAllUserProducts)
    }

    private getAllUser = async (request: Request, response: Response) => {
        response.send(await this.userService.findAll())
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