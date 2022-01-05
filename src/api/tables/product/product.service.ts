import ProductModel from "./model/product.model";
import {logger} from "../../logger";
import CreateProductDto from "./product.dto";
import {ProductInterface} from "./product.interface";

export class ProductService{
    private productModel = ProductModel;

    constructor() {
    }

    async create(newProductData: CreateProductDto){
        const createdProduct = new this.productModel({
            ...newProductData,
        });
        logger.info("Route: create newt Products");
        return await createdProduct.save() ;
    }

    async findAll() {
        logger.info("Route: findAll");
        return this.productModel.find();
    }

    async findOne(_id: string){
        logger.info("Route: findOne");
        return this.productModel.findOne({_id})
    }

    async update(_id: string, updateProductsData: {  }){
        logger.info("Route: update");
        return this.productModel.findOneAndUpdate({_id }, updateProductsData, {useFindAndModify: false} )
    }

    async delete(_id: string){
        logger.info("Route: delete");
        //return this.productModel.find();
        return this.productModel.findByIdAndDelete(_id)
    }
}