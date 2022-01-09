import { Schema} from 'mongoose';
import {ProductInterface} from '../product.interface'
import {ObjectId} from "mongodb";

export const ProductSchema = new Schema<ProductInterface>({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    user_id: {type: ObjectId, required: true}
}, {timestamps: true});
