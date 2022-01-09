import {Request, Response, NextFunction} from 'express';
import Controller from "../controller";
import {ProductService} from "./product.service";
import {UpdateProductDto, CreateProductDto} from "./dto"
import {AuthenticationMiddleware} from "../../middleware";
import ValidationUserMiddleware from "../../middleware/validateUser.middleware";
import RequestUserInterface from "../user/interfaces/requestUser.interface";
import {ObjectId} from "mongodb";

export class ProductController extends Controller {

    constructor(private readonly productService: ProductService = new ProductService()) {
        super('/product')
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.all(`${this.path}/*`, AuthenticationMiddleware)
            .get(`${this.path}s`, AuthenticationMiddleware, this.getAllProducts)
            .get(`${this.path}/:id`, this.getProductById)
            .post(this.path, AuthenticationMiddleware, ValidationUserMiddleware(CreateProductDto, true), this.createProduct)
            .patch(`${this.path}/:id`, AuthenticationMiddleware, ValidationUserMiddleware(UpdateProductDto, true), this.updateProduct)
            .delete(`${this.path}/:id`, AuthenticationMiddleware, this.deleteProduct)
    }

    private getAllProducts = async (request: Request, response: Response) => {
        response.send(await this.productService.findAll());
    }

    private getProductById = async (request: Request, response: Response, next_f: NextFunction) => {
        const result = await this.productService.findOne({_id: request.params.id}, next_f)
        if (result)
            response.send(result)
    }

    private createProduct = async (request: RequestUserInterface, response: Response, next_f: NextFunction) => {
        const productData: CreateProductDto = request.body;
        productData.user_id = new ObjectId(request.user?._id)
        const result = await this.productService.create(productData, next_f)
        if (result)
            response.send(result)
    }

    private updateProduct = async (request: Request, response: Response, next_f: NextFunction) => {
        const productData: UpdateProductDto = request.body;
        const result = await this.productService.update(request.params.id, productData, next_f)
        if (result)
            response.send(result)
    }

    private deleteProduct = async (request: Request, response: Response, next_f: NextFunction) => {
        const result = await this.productService.delete(request.params.id, next_f)
        if (result)
            response.send(result)
    }
}