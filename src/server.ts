import App from './app';
import {ProductController} from "./api/tables/product/product.controller";
import {CommandController} from "./api/tables/command/command.controller";


const app = new App(
    [
        new ProductController(),
        new CommandController(),
    ],
);

app.listen();