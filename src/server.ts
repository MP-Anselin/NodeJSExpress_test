import App from './app';
import {ProductController} from "./api/tables/product/product.controller";
import {CommandController} from "./api/tables/command/command.controller";
import {UserController} from "./api/tables/user/user.controller";
import {AuthenticationController} from "./api/tables/authentification/authentication.controller";

const app = new App(
    [
        new AuthenticationController(),
        new UserController(),
        new ProductController(),
        new CommandController(),
    ],
);

app.listen();