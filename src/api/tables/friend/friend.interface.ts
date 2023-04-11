import {Document} from 'mongoose'
import {ObjectId} from "mongodb";

export interface FriendInterface extends Document{
    friend_ship_status: number,
    user_id: ObjectId
    friend_id: ObjectId
}
