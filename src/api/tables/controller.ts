import {Router} from 'express';
import {ControllerInterface} from "./controller.interface";

class Controller implements ControllerInterface {
    public path: string;
    public router = Router();

    constructor(path: string) {
        this.path = path
    }
}

export default Controller;