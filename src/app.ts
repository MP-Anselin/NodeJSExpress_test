import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import connectDB from "./api/services/database.service";
import Controller from "./api/tables/controller";
import {ErrorHandlingMiddleware} from "./api/middleware";
import {logger} from "./api/logger";

class App {
    public app: express.Application;

    constructor(controllers: Controller[]) {
        this.app = express();

        App.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    public listen() {
        this.app.listen(process.env.PORT, () => {
            logger.info(`App listening on the port ${process.env.PORT}`);
        });
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    private initializeErrorHandling() {
        console.log("I pass initializeErrorHandling")
        this.app.use(ErrorHandlingMiddleware);
    }

    private static connectToTheDatabase() {
        connectDB()
    }
}

export default App;