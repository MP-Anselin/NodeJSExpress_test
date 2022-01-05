import { IsNumber, IsDate, IsArray } from 'class-validator';

class CreateCommandDto {
    @IsArray()
    public articles: [];

    @IsNumber()
    public min_price: number;
}

export default CreateCommandDto;