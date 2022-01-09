import {Document} from 'mongoose'

export interface CommandInterface extends Document{
    date: Date,
    createdAt: Date,
    updatedAt: Date,
    articles: [],
    min_price: number,
    isCompleted: boolean,
    user_id: String
}