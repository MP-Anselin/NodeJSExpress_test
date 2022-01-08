import { IsString, IsNumber, Min } from 'class-validator';

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
}

export default CreateProductDto;