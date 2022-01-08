import {Request, Response} from 'express';
import Controller from "../controller";
import {UserService} from "./user.service";

export class UserController extends Controller {
    constructor(private readonly userService: UserService = new UserService()) {
        super('/users')
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllUser)
    }

    private getAllUser = async (request: Request, response: Response) => {
        response.send(await this.userService.findAll())
    }
}