import {IsString, IsBoolean, MinLength, MaxLength, Matches, IsNumber} from 'class-validator';

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
    userRole: string = '';

    @IsString()
    image: string = '';

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string = '';

    @IsBoolean()
    isLog: boolean = false;

    @IsNumber()
    status: number = 1;

    @IsNumber()
    age: number | undefined;
}

export default CreateUserDto
