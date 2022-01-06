import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import connectDB from "./api/services/database.service";
import Controller from "./api/tables/controller";

class App {
    public app: express.Application;

    constructor(controllers: Controller[]) {
        this.app = express();

        this.availableRoutes()

        App.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    public availableRoutes(){
    }

    public listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
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

    private static connectToTheDatabase() {
        connectDB()
    }
}

export default App;