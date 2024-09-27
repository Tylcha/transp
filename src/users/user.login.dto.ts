import { IsEnum, IsNotEmpty, IsString, Length, MinLength } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    @IsString()
    @Length(11, 11, { message: "Tc numarasi 11 haneli olmalidir" })
    tc: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    password: string;
}