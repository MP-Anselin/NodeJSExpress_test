import {IsArray, IsString, IsBoolean, MinLength, MaxLength, Matches} from 'class-validator';

export class CreateUserDto {
    @IsString()
    firstName: string = '';

    @IsString()
    lastName: string = '';

    @IsString()
    username: string = '';

    @IsString()
    email: string = '';

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string = '';

    @IsBoolean()
    isLog: boolean = false;

    @IsArray()
    command: [] = [];
}

export default CreateUserDto
