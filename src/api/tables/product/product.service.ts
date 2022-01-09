import ProductModel from "./model/product.model";
import {UpdateProductDto, CreateProductDto} from "./dto"
import {logger} from "../../logger";
import {NextFunction} from "express";
import {ProductErrorException} from "../../httpErrorException";

export class ProductService {
    private productModel = ProductModel;

    async create(newProductData: CreateProductDto, next_f: NextFunction) {
        const createdProduct = new this.productModel({
            ...newProductData,
        });
        const response = await createdProduct.save();
        if (response) {
            logger.info("Route: Product => create new Products");
            return (response)
        } else {
            logger.error("Route: Product => [error] create new Products");
            next_f(new ProductErrorException(<string>process.env.INTERNAL_SERVER_ERROR_MSG))
        }
    }

    async findAll() {
        logger.info("Route: Product => findAll product");
        return this.productModel.find();
    }

    async sortProductBy(filter: {}) {
        logger.info("Route: Product => findAll product");
        return this.productModel.find(filter);
    }

    async findOne(filter: {}, next_f: NextFunction) {
        const response = await this.productModel.findOne(filter)
        if (response) {
            logger.info("Route: findOne a product");
            return (response)
        } else {
            logger.error("Route: Product => [error] findOne a product");
            next_f(new ProductErrorException(<string>process.env.NOT_FOUND_CODE, `the server could not find product with element ${filter}`))
        }
    }

    async update(_id: string, updateProductsData: UpdateProductDto, next_f: NextFunction) {
        const response = await this.productModel.findOneAndUpdate({_id}, updateProductsData, {useFindAndModify: false})
        if (response) {
            logger.info("Route: Product => update a product");
            return (response)
        } else {
            logger.error("Route: Product => [error] update a product");
            next_f(new ProductErrorException(<string>process.env.NOT_FOUND_CODE, `the server could not find product with _id ${_id}`))
        }
    }

    async getPrice(_id: string, next_f: NextFunction) {
        const currentProd = await this.findOne({_id: _id}, next_f)
        return currentProd?.price ? currentProd.price : 0
    }

    async delete(_id: string, next_f: NextFunction) {
        const response = await this.productModel.findByIdAndDelete(_id)
        if (response) {
            logger.info("Route: Product => delete a product");
            return (response)
        } else {
            logger.error("Route: Product => [error] delete a product");
            next_f(new ProductErrorException(<string>process.env.NOT_FOUND_CODE, `the server could not find product with _id ${_id}`))
        }
    }
}