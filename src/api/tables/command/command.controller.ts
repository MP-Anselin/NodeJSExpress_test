import {Request, Response, NextFunction} from 'express';
import Controller from "../controller";
import {CommandService} from "./command.service";
import {CreateCommandDto, UpdateCommandDto} from "./dto";
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
    }

    private createCommand = async (request: Request, response: Response, next_f: NextFunction) => {
        const commandData: CreateCommandDto = request.body;
        const result = await this.commandService.create(commandData, next_f)
        if (result)
            response.send(result)
    }

    private updateCommand = async (request: Request, response: Response, next_f: NextFunction) => {
        const commandData: UpdateCommandDto = request.body;
        response.send(await this.commandService.update(request.params.id, commandData, next_f))
    }

    private getNbrCommandByDate = async (request: Request, response: Response) => {
        response.send(await this.commandService.nbrByDate(request.params.date))
    }

    private getCommandByDatePrice = async (request: Request, response: Response) => {
        response.send(await this.commandService.commandByDatePrice(request.params.date, request.params.price))
    }

    private sortCommandBy = async (request: Request, response: Response) => {
        const data: FiltersCommandInterface = request.query
        response.send(await this.commandService.sortCommandBy(data))
    }

    private addProduct = async (request: Request, response: Response, next_f: NextFunction) => {
        response.send(await this.commandService.addProduct(request.params.id, request.params.productId, next_f))
    }

    private deleteProduct = async (request: Request, response: Response, next_f: NextFunction) => {
        response.send(await this.commandService.deleteProduct(request.params.id, request.params.productId, next_f))
    }

    private buyCommand = async (request: Request, response: Response, next_f: NextFunction) => {
        const commandData: UpdateCommandDto = request.body;
        const result = await this.commandService.buy(request.params.id, commandData, next_f)
        if (result)
            response.send(result)
    }
}