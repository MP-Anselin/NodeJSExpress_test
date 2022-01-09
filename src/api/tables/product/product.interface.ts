import {Document} from 'mongoose'
import {ObjectId} from "mongodb";

export interface ProductInterface extends Document{
    name: string,
    price: number,
    category: string,
    description: string,
    quantity: number,
    user_id: ObjectId
}