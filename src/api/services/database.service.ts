import mongoose from "mongoose";
import dotenv from 'dotenv'
import {logger} from "../logger";

function connectDB() {
    dotenv.config({path: './config/config.env'});

    return mongoose
        .connect(<string>process.env.MONGO_URI)
        .then(() => {
            logger.info("Database connected");
        })
        .catch((error) => {
            logger.error("db error", error);
            process.exit(1);
        });
}

export default connectDB;