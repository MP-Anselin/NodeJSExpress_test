import CommandModel from "./model/command.model";
import {UpdateCommandDto, CreateCommandDto} from "./dto";
import {logger} from "../../logger";
import {commandNumberAggregate, commandPriceUpAggregate} from "./aggregates";
import {ProductService} from "../product/product.service";
import {ObjectId} from "mongodb";
import {FiltersCommandInterface} from "./interfaces";
import {NextFunction} from "express";
import {INTERNAL_SERVER_ERROR, NOT_FOUND} from "../../utils/macro.globals";
import { HttpErrorException } from "../../httpErrorException";

export class CommandService {
    private commandModel = CommandModel;
    private productService = new ProductService();

    async create(newCommandData: CreateCommandDto, next_f: NextFunction) {
        const createCommand = new this.commandModel(newCommandData)

        createCommand.date = new Date();
        createCommand.isCompleted = false;
        createCommand.createdAt = createCommand.date;
        createCommand.updatedAt = createCommand.date;

        const priceInfo = await this.getListAllPrice('', '', createCommand, next_f)
        createCommand.min_price = priceInfo.priceCommand;

        const response = await createCommand.save();
        if (response) {
            logger.info("Route: Command => create new command");
            return response
        }
        else {
            logger.error("Route: Command => [error] create new command");
            next_f(new HttpErrorException(INTERNAL_SERVER_ERROR))
        }
    }

    async update(_id: string, updateCommandData: UpdateCommandDto, next_f: NextFunction) {
        updateCommandData.updatedAt = new Date();
        const response = await this.commandModel.findOneAndUpdate({_id: _id}, updateCommandData)
        if (response) {
            logger.info("Route: Command => update a command");
            return (response)
        } else {
            logger.error("Route: Command => [error] update a command");
            next_f(new HttpErrorException(NOT_FOUND, `the server could not find command with _id ${_id}`))
        }
    }

    async addProduct(_id: string, id_product: string, next_f: NextFunction) {
        const priceInfo = await this.getListAllPrice(_id, id_product, null, next_f)
        const min_price = priceInfo.priceCommand + priceInfo.priceProduct
        const response = await this.commandModel.updateOne({_id}, {
            $push: {articles: new ObjectId(id_product)},
            min_price: min_price
        })
        if (response) {
            logger.info("Route: add a product in command");
            return (response)
        } else {
            logger.error("Route: Command => [error] add a product in command");
            next_f(new HttpErrorException(NOT_FOUND, `the server could not find command with _id ${_id}`))
        }
    }

    async deleteProduct(_id: string, id_product: string, next_f: NextFunction) {
        const dataDto = await this.deleteProductInCommand(_id, id_product, next_f)
        const response = await this.commandModel.updateOne({_id}, dataDto)
        if (response) {
            logger.info("Route: Command => delete a product in command");
            return (response)
        } else {
            logger.error("Route: Command => [error] delete a product in command");
            next_f(new HttpErrorException(NOT_FOUND, `the server could not find command with _id ${_id}`))
        }
    }

    async nbrByDate(date: string) {
        logger.info("Route: Command => nbr of command By Date");
        return this.commandModel.aggregate(commandNumberAggregate(new Date(date)))
    }

    async commandByDatePrice(date: string, price: string) {
        const agg: any = commandPriceUpAggregate(new Date(date), parseInt(price));
        logger.info("Route: Command => commands By Date & Price");
        return this.commandModel.aggregate(agg)
    }

    async buy(_id: string, updateCommandData: UpdateCommandDto, next_f: NextFunction) {
        updateCommandData.isCompleted = true;
        updateCommandData.date = new Date();
        updateCommandData.updatedAt = new Date();
        const response = await this.commandModel.findOneAndUpdate({_id: _id}, updateCommandData)
        if (response) {
            logger.info("Route: Command => update a command");
            return (response)
        } else {
            logger.error("Route: Command => [error] update a command");
            next_f(new HttpErrorException(NOT_FOUND, `the server could not find command with _id ${_id}`))
        }
    }

    async sortCommandBy(sort: FiltersCommandInterface) {
        const dateUp = new Date(<string>sort.date)

        if (sort?.date && dateUp.toString() !== "Invalid Date") {
            const minDate = new Date(dateUp.getFullYear(), dateUp.getMonth(), dateUp.getDate(), 0);
            const maxDate = new Date(dateUp.getFullYear(), dateUp.getMonth(), dateUp.getDate(), 23, 59);
            sort.date = {$gt: minDate, $lte: maxDate}
        }
        if (sort?.articles && sort.articles)
            sort.articles = {$in: Array.isArray(sort.articles) ? sort.articles : [sort.articles]}
        if (sort?.price && sort.price)
            sort.min_price = {$gte: sort.price}

        logger.info("Route: Command => sort commands");
        return this.commandModel.find(sort)
    }

    private getDuplicateObject(array: []) {
        const occurrences: any = {}
        array.forEach((element) => {
            occurrences[element] = occurrences[element] ? occurrences[element] + 1 : 1;
        })
        return occurrences
    }

    private async getListAllPrice(_id: string = '', id_prod: string = '', currentCommand: any = null, next_f: NextFunction) {
        let currentPrice = 0
        currentCommand = (_id && !currentCommand) ? await this.commandModel.findOne({_id: _id}) : currentCommand

        if (currentCommand?.articles) {
            const dup = this.getDuplicateObject(currentCommand.articles)
            for (const entry of Object.entries(dup)) {
                const [key, value] = entry;
                if (value) {
                    const prodPrice = await this.productService.getPrice(key, next_f)
                    currentPrice += (prodPrice * <number>value)
                }
            }
        }

        const priceProduct = id_prod ? await this.productService.getPrice(id_prod, next_f) : 0
        return {priceCommand: currentPrice, priceProduct: priceProduct};
    }

    private async deleteProductInCommand(_id: string, id_product: string, next_f: NextFunction) {
        const currentCommand = await this.commandModel.findOne({_id: _id})
        const dataDto: UpdateCommandDto = {min_price: 0};

        if (currentCommand?.articles) {
            currentCommand.articles.forEach((element: any, pos: number) => {
                if (element.toString() === new ObjectId(id_product).toString()) {
                    currentCommand.articles.splice(pos, 1);
                    return
                }
            })
            dataDto.articles = currentCommand.articles
        }
        const priceInfo = await this.getListAllPrice(_id, id_product, currentCommand, next_f)
        dataDto.min_price = priceInfo.priceCommand
        return dataDto
    }
}
