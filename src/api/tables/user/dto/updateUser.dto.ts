import {IsArray, IsBoolean, IsDateString, IsNumber, IsString, Matches, MaxLength, MinLength} from "class-validator";

export class UpdateUserDto {
    @IsString()
    firstName?: string;

    @IsString()
    lastName?: string;

    @IsString()
    username?: string;

    @IsString()
    email?: string;

    @IsString()
    userRole?: string;

    @IsString()
    image?: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password?: string;

    @IsBoolean()
    isLog?: boolean;

    @IsDateString()
    createAt?: Date;

    @IsDateString()
    updateAt?: Date;

    @IsNumber()
    status?: Number;

    @IsNumber()
    age?: Number;
}

export default UpdateUserDto
