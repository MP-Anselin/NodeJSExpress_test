import CommandModel from "./model/command.model";
import {UpdateCommandDto, CreateCommandDto} from "./dto/index.dto";
import {logger} from "../../logger";
import {commandNumber} from "./aggregates";

export class CommandService {
    private commandModel = CommandModel;

    async create(newCommandData: CreateCommandDto) {
        const createCommand = new this.commandModel(newCommandData)
        createCommand.date = new Date();
        //createCommand.min_price = 0;
        createCommand.createdAt = createCommand.date;
        createCommand.updatedAt = createCommand.date;
        logger.info("Route: create new command");
        return await createCommand.save();
    }

    async update(_id: string, updateCommandData: UpdateCommandDto) {
        logger.info("Route: update a command");
        updateCommandData.updatedAt = new Date();
        return this.commandModel.findOneAndUpdate({_id}, updateCommandData)
    }

    async nbrByDate(date1: string) {
        logger.info("Route: nbr of command By Date");
        const date = new Date(date1)
        return this.commandModel.aggregate(commandNumber(new Date(date)))
    }

    async buy(_id: string, updateCommandData: UpdateCommandDto) {
        logger.info("Route: update a command");
        updateCommandData.date = new Date();
        updateCommandData.updatedAt = new Date();
        return this.commandModel.findOneAndUpdate({_id}, updateCommandData)
    }
}