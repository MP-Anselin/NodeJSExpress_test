import { IsString } from 'class-validator';

class CreateProductDto {
    @IsString()
    public name: string;

    @IsString()
    public price: number;

    @IsString()
    public category: string;

    @IsString()
    public description: string;

    @IsString()
    public quantity: number;
}

export default CreateProductDto;