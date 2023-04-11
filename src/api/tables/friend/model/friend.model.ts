import mongoose, { Document } from 'mongoose';
import {FriendInterface} from '../friend.interface'
import {FriendSchema} from "./friend.schema";

const friendModel = mongoose.model<FriendInterface & Document>('Friend', FriendSchema);

export default friendModel;
