import {Request, Response, NextFunction} from 'express';
import Controller from "../controller";
import {ProductService} from "./product.service";
import {UpdateProductDto, CreateProductDto} from "./dto/index.dto"

export class ProductController extends Controller {

    constructor(private readonly productService: ProductService = new ProductService()) {
        super('/products')
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllProducts);
        this.router.get(`${this.path}/:id`, this.getProductById);
        this.router.post(this.path, this.createProduct)
        this.router.patch(`${this.path}/:id`, this.updateProduct)
        this.router.delete(`${this.path}/:id`, this.deleteProduct)
        /*this.router
            .all(`${this.path}/*`, authMiddleware)
            .patch(`${this.path}/:id`, validationMiddleware(CreateProcutDto, true), this.modifyPost)
            .delete(`${this.path}/:id`, this.deletePost)
            .post(this.path, authMiddleware, validationMiddleware(CreatePostDto), this.createPost);*/
    }

    private getAllProducts = async (request: Request, response: Response) => {
        response.send(await this.productService.findAll());
    }

    private getProductById = async (request: Request, response: Response, next: NextFunction) => {
        response.send(await this.productService.findOne(request.params.id))
    }

    private createProduct = async (request: Request, response: Response) => {
        const productData: CreateProductDto = request.body;
        response.send(await this.productService.create(productData))
    }

    private updateProduct = async (request: Request, response: Response, next: NextFunction) => {
        const productData: UpdateProductDto = request.body;
        response.send(await this.productService.update(request.params.id, productData))
    }

    private deleteProduct = async (request: Request, response: Response, next: NextFunction) => {
        response.send(await this.productService.delete(request.params.id))
    }
}