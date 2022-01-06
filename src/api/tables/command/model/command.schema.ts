import {Schema} from 'mongoose';
import {CommandInterface} from "../command.interface";

export const CommandSchema = new Schema<CommandInterface>({
    date: {type: Date, required: true},
    createdAt: {type: Date, required: true},
    updatedAt: {type: Date, required: true},
    articles: {type: [], required: true},
    min_price: {type: Number, required: true},
    isCompleted: {type: Boolean},
},{timestamps: true})
