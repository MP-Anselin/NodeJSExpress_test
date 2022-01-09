import { IsString, IsNumber, Min } from 'class-validator';
import {ObjectId} from "mongodb";

class CreateProductDto {
    @IsString()
    public name: string = "";

    @IsNumber()
    @Min(0)
    public price: number = 0;

    @IsString()
    public category: string = "";

    @IsString()
    public description: string = "";

    @IsNumber()
    @Min(0)
    public quantity: number = 0;

    public user_id: ObjectId | any;
}

export default CreateProductDto;