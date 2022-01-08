import {Schema} from 'mongoose';
import {UserInterface} from "../interfaces";

export const UserSchema = new Schema<UserInterface> ({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    isLog: {type: Boolean, required: true},
    createAt: {type: Date, required: true},
    updateAt: {type: Date, required: true},
    command: {type: [], required: true}
})