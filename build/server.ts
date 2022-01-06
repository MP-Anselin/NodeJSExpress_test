import App from '../src/app';
import {ProductController} from "../src/api/tables/product/product.controller";
import {CommandController} from "../src/api/tables/command/command.controller";


const app = new App(
    [
        new ProductController(),
        new CommandController(),
    ],
);

app.listen();