import {Request, Response, NextFunction} from 'express';
import Controller from "../controller";
import {CommandService} from "./command.service";
import {CreateCommandDto, UpdateCommandDto} from "./dto/index.dto";

export class CommandController extends Controller{
    constructor(private readonly commandService: CommandService = new CommandService()) {
        super('/commands')
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(this.path, this.createCommand)
        this.router.get(`${this.path}/:date`, this.getNbrCommandByDate);
        this.router.patch(`${this.path}/:id`, this.updateCommand)
        this.router.patch(`${this.path}/:id`, this.buyCommand)
        /*this.router
            .all(`${this.path}/*`, authMiddleware)
            .patch(`${this.path}/:id`, validationMiddleware(CreateProcutDto, true), this.modifyPost)
            .delete(`${this.path}/:id`, this.deletePost)
            .post(this.path, authMiddleware, validationMiddleware(CreatePostDto), this.createPost);*/
    }

    private createCommand = async (request: Request, response: Response) => {
        const commandData: CreateCommandDto = request.body;
        response.send(await this.commandService.create(commandData))
    }

    private updateCommand = async (request: Request, response: Response, next: NextFunction) => {
        const commandData: UpdateCommandDto = request.body;
        response.send(await this.commandService.update(request.params.id, commandData))
    }

    private getNbrCommandByDate = async (request: Request, response: Response, next: NextFunction) => {
        response.send(await this.commandService.nbrByDate(request.params.date))
    }

    private buyCommand = async (request: Request, response: Response, next: NextFunction) => {
        const commandData: UpdateCommandDto = request.body;
        response.send(await this.commandService.buy(request.params.id, commandData))
    }
}