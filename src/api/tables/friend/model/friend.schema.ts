import { Schema} from 'mongoose';
import {FriendInterface} from '../friend.interface'
import {ObjectId} from "mongodb";

export const FriendSchema = new Schema<FriendInterface>({
    friend_ship_status: { type: Number, required: true },
    user_id: {type: ObjectId, required: true},
    friend_id: {type: ObjectId, required: true}
}, {timestamps: true});
