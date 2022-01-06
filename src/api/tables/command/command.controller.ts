import {Request, Response, NextFunction} from 'express';
import Controller from "../controller";
import {CommandService} from "./command.service";
import {CreateCommandDto, UpdateCommandDto} from "./dto/index.dto";
import {FiltersCommandInterface} from "./interfaces";

export class CommandController extends Controller {
    constructor(private readonly commandService: CommandService = new CommandService()) {
        super('/commands')
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(this.path, this.createCommand)
            .get(`${this.path}/find/:date&:price`, this.getCommandByDatePrice)
            .get(`${this.path}/find/date/:date`, this.getNbrCommandByDate)
            .get(`${this.path}/sort*?`, this.sortCommandBy)
            .patch(`${this.path}/:id`, this.updateCommand)
            .patch(`${this.path}/add/:id&:productId`, this.addProduct)
            .patch(`${this.path}/delete/:id&:productId`, this.deleteProduct)
            .patch(`${this.path}/buy/:id?`, this.buyCommand)
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

    private getCommandByDatePrice = async (request: Request, response: Response, next: NextFunction) => {
        response.send(await this.commandService.commandByDatePrice(request.params.date, request.params.price))
    }

    private sortCommandBy = async (request: Request, response: Response, next: NextFunction) => {
        const data: FiltersCommandInterface = request.query
        response.send(await this.commandService.sortCommandBy(data))
    }


    private addProduct = async (request: Request, response: Response, next: NextFunction) => {
        response.send(await this.commandService.addProduct(request.params.id, request.params.productId))
    }

    private deleteProduct = async (request: Request, response: Response, next: NextFunction) => {
        response.send(await this.commandService.deleteProduct(request.params.id, request.params.productId))
    }

    private buyCommand = async (request: Request, response: Response, next: NextFunction) => {
        const commandData: UpdateCommandDto = request.body;
        response.send(await this.commandService.buy(request.params.id, commandData))
    }
}