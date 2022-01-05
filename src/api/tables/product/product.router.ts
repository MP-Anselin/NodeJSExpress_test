import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import {ProductInterface} from "./product.interface";

export const productRouter = express.Router();

productRouter.use(express.json());

// GET
productRouter.get("/", async (_req: Request, res: Response) => {
});

// POST
productRouter.get("/:id", async (req: Request, res: Response) => {
});

// PUT

// DELETE