import { IsString, IsNumber, Min } from 'class-validator';

class CreateProductDto {
    @IsString()
    public name: string;

    @IsNumber()
    @Min(0)
    public price: number;

    @IsString()
    public category: string;

    @IsString()
    public description: string;

    @IsNumber()
    @Min(0)
    public quantity: number;
}

export default CreateProductDto;