import { IsString, IsNumber } from 'class-validator';

class UpdateProductDto {
    @IsString()
    public name?: string;

    @IsNumber()
    public price?: number;

    @IsString()
    public category?: string;

    @IsString()
    public description?: string;

    @IsNumber()
    public quantity?: number;
}

export default UpdateProductDto;