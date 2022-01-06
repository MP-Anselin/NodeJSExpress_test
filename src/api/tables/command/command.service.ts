import CommandModel from "./model/command.model";
import {UpdateCommandDto, CreateCommandDto} from "./dto/index.dto";
import {logger} from "../../logger";
import {commandNumber} from "./aggregates";
import {ProductService} from "../product/product.service";
import {ObjectId} from "mongodb";

export class CommandService {
    private commandModel = CommandModel;
    private productService = new ProductService();

    async create(newCommandData: CreateCommandDto) {
        const createCommand = new this.commandModel(newCommandData)
        createCommand.date = new Date();
        createCommand.isCompleted = false;
        createCommand.createdAt = createCommand.date;
        createCommand.updatedAt = createCommand.date;
        logger.info("Route: create new command");
        return await createCommand.save();
    }

    async update(_id: string, updateCommandData: UpdateCommandDto) {
        updateCommandData.updatedAt = new Date();
        logger.info("Route: update a command");
        return this.commandModel.findOneAndUpdate({_id}, updateCommandData)
    }

    async addProduct(_id: string, id_product: string) {
        const priceInfo = await this.getListAllPrice(_id, id_product)
        const min_price = priceInfo.priceCommand + priceInfo.priceProduct
        logger.info("Route: add a product in command");
        return this.commandModel.updateOne({_id}, {$push: {articles: new ObjectId(id_product)}, min_price: min_price})
    }

    async deleteProduct(_id: string, id_product: string) {
        const dataDto = await this.deleteProductInCommand(_id, id_product)
        logger.info("Route: delete a product in command");
        return this.commandModel.updateOne({_id}, dataDto)
    }

    async nbrByDate(date1: string) {
        const date = new Date(date1)
        logger.info("Route: nbr of command By Date");
        return this.commandModel.aggregate(commandNumber(new Date(date)))
    }

    async buy(_id: string, updateCommandData: UpdateCommandDto) {
        await this.productService.reduceQuantity(_id);
        updateCommandData.isCompleted = true;
        updateCommandData.date = new Date();
        updateCommandData.updatedAt = new Date();
        logger.info("Route: update a command");
        return this.commandModel.findOneAndUpdate({_id}, updateCommandData)
    }

    private getDuplicateObject(array: []) {
        const occurrences: any = {}
        array.forEach((element) => {
            occurrences[element] = occurrences[element] ? occurrences[element] + 1 : 1;
        })
        return occurrences
    }

    private async getListAllPrice(_id: string, id_prod: string, currentCommand: any = null) {
        if (!currentCommand)
            currentCommand = await this.commandModel.findOne({_id})
        let currentPrice = 0

        if (currentCommand?.articles) {
            const dup = this.getDuplicateObject(currentCommand.articles)
            for (const entry of Object.entries(dup)) {
                const [key, value] = entry;
                if (value) {
                    const prodPrice = await this.productService.getPrice(key)
                    currentPrice += (prodPrice * <number>value)
                }
            }
        }

        const priceProduct = await this.productService.getPrice(id_prod)
        return {priceCommand: currentPrice, priceProduct: priceProduct};
    }

    private async deleteProductInCommand(_id: string, id_product: string) {
        const currentCommand = await this.commandModel.findOne({_id})
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
        const priceInfo = await this.getListAllPrice(_id, id_product, currentCommand)
        dataDto.min_price = priceInfo.priceCommand
        return dataDto
    }
}