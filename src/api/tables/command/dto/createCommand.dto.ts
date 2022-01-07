import { IsNumber, IsArray } from 'class-validator';

class CreateCommandDto {
    @IsArray()
    public articles: [] = [];

    @IsNumber()
    public min_price: number = 0;
}

export default CreateCommandDto;