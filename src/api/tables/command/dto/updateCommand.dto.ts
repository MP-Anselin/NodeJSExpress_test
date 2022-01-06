import {IsNumber, IsArray, IsDate, IsBoolean} from 'class-validator';

class UpdateCommandDto {
    @IsDate()
    public date?: Date;

    @IsDate()
    public updatedAt?: Date;

    @IsArray()
    public articles?: [];

    @IsNumber()
    public min_price?: number;

    @IsBoolean()
    public isCompleted?: boolean;
}

export default UpdateCommandDto;