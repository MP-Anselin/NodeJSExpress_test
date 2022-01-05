import {Request, Response, NextFunction, Router} from 'express';
import {ProductService} from "./product.service";
import express from "express";
import Controller from "../../interfaces/controller.interface";
import CreateProductDto from "./product.dto";
import {ProductInterface} from "./product.interface";

const productsRouter = express.Router();
productsRouter.use(express.json());


export class ProductController implements Controller {
    public path = '/products';
    public router = Router();

    //private productService = new ProductService();

    constructor(private readonly productService = new ProductService()) {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllProducts);
        this.router.get(`${this.path}/:id`, this.getPostById);
        this.router.post(this.path, this.createProducts)
        this.router.patch(`${this.path}/:id`, this.updateProducts)
        this.router.delete(`${this.path}/:id`, this.deleteProducts)
        /*this.router
            .all(`${this.path}/*`, authMiddleware)
            .patch(`${this.path}/:id`, validationMiddleware(CreateProcutDto, true), this.modifyPost)
            .delete(`${this.path}/:id`, this.deletePost)
            .post(this.path, authMiddleware, validationMiddleware(CreatePostDto), this.createPost);*/
    }

    private getAllProducts = async (request: Request, response: Response) => {
        response.send(await this.productService.findAll());
    }

    private getPostById = async (request: Request, response: Response, next: NextFunction) => {
        response.send(await this.productService.findOne(request.params.id))
        /*const id = request.params.id;
        const product = await this.productModel.findById(id);
        if (product) {
            response.send(product);
        } else {
            //next(new PostNotFoundException(id));
        }
        logger.info("Route: getPostById");*/
    }


    private createProducts = async (request: Request, response: Response) => {
        console.log("createProducts: request.body = ", request.body)
        /*        const dataTest = {
                    "name": "test1_name",
                    "price": 0,
                    "category": "test1_category",
                    "description": "test1_descryption",
                    "quantity": 1s
                }
                const productData: CreateProductDto = dataTest;*/
        const productData: CreateProductDto = request.body;

        response.send(await this.productService.create(productData))
    }

    private updateProducts = async (request: Request, response: Response, next: NextFunction) => {
        console.log("updateProducts request.body = ", request.body)
        const productData: ProductInterface = request.body;
        response.send(await this.productService.update(request.params.id, productData))
    }

    private deleteProducts = async (request: Request, response: Response, next: NextFunction) => {
        response.send(await this.productService.delete(request.params.id))
    }
}