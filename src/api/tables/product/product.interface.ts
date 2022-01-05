import {Document} from 'mongoose'

export interface ProductInterface extends Document{
    name: string,
    price: number,
    category: string,
    description: string,
    quantity: number,
}