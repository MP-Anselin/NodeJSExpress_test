import { IsString, IsNumber, Min } from 'class-validator';
import {ObjectId} from "mongodb";

class CreateFriendDto {
    public user_id!: ObjectId;

    public friend_id!: ObjectId;

    @IsNumber()
    public friend_ship_status: number = 0;
}

export default CreateFriendDto;
