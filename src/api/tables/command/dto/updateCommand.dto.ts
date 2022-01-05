import {IsNumber, IsArray, IsDate} from 'class-validator';

class UpdateCommandDto {
    @IsDate()
    public date?: Date;

    @IsDate()
    public updatedAt?: Date;

    @IsArray()
    public articles?: [];

    @IsNumber()
    public min_price?: number;
}

export default UpdateCommandDto;