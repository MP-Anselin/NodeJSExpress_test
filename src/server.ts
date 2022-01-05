import App from './app';
import {ProductController} from "./api/tables/product/product.controller";


const app = new App(
    [
        new ProductController(),
    ],
);

app.listen();