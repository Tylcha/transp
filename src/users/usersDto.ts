import { IsNotEmpty, IsString, Length, MinLength } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @Length(11, 11)
    tc: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    password: string;
}