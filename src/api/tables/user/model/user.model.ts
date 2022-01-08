import mongoose, { Document } from 'mongoose';
import {UserInterface} from "../interfaces";
import {UserSchema} from "./user.schema";

const UserModel = mongoose.model<UserInterface & Document>('User', UserSchema);

export default UserModel;