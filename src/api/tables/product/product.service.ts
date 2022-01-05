import ProductModel from "./model/product.model";
import {UpdateProductDto, CreateProductDto} from "./dto/index.dto"
import {logger} from "../../logger";

export class ProductService{
    private productModel = ProductModel;

    async create(newProductData: CreateProductDto){
        const createdProduct = new this.productModel({
            ...newProductData,
        });
        logger.info("Route: create new Products");
        return await createdProduct.save() ;
    }

    async findAll() {
        logger.info("Route: findAll product");
        return this.productModel.find();
    }

    async findOne(_id: string){
        logger.info("Route: findOne a product");
        return this.productModel.findOne({_id})
    }

    async update(_id: string, updateProductsData: UpdateProductDto){
        logger.info("Route: update a product");
        return this.productModel.findOneAndUpdate({_id }, updateProductsData, {useFindAndModify: false} )
    }

    async delete(_id: string){
        logger.info("Route: delete a product");
        return this.productModel.findByIdAndDelete(_id)
    }
}