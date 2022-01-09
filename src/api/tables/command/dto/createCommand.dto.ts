import {IsNumber, IsArray, IsString} from 'class-validator';
import {ObjectId} from "mongodb";

class CreateCommandDto {
    @IsArray()
    public articles: [] = [];

    @IsNumber()
    public min_price: number = 0;

    @IsString()
    public user_id: ObjectId | any;
}

export default CreateCommandDto;