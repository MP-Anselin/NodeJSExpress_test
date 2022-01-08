import {ObjectId} from "mongodb";

export interface UserInterface {
    _id: string
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    isLog: boolean,
    createAt: Date,
    updateAt: Date,
    command: ObjectId[]
}