import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import connectDB from "./api/services/database.service";
import Controller from "./api/tables/controller";
import {ErrorHandlingMiddleware} from "./api/middleware";
import {logger} from "./api/logger";
import cors from 'cors';

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
        const corsConfig = {
            credentials: true,
            origin: true,
        };
        this.app.use(cors(corsConfig));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    private initializeErrorHandling() {
        this.app.use(ErrorHandlingMiddleware);
    }

    private static connectToTheDatabase() {
        connectDB()
    }
}

export default App;
