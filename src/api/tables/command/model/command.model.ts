import mongoose, { Document } from 'mongoose';
import {CommandInterface} from "../command.interface";
import {CommandSchema} from "./command.schema";

const CommandModel = mongoose.model<CommandInterface & Document>('Command', CommandSchema);

export default CommandModel;