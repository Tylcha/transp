import { IsEnum, IsNotEmpty, IsString, Length, MinLength } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty({ message: "Kullanici adi bos gecilemez" })
    @IsString()
    @Length(11, 11, { message: "Tc numarasi 11 haneli olmalidir", })
    user_name: string;

    @IsNotEmpty({ message: "Sifre bos gecilemez" })
    @IsString()
    @MinLength(6, {message:"Minimum 6 karakter"})
    password: string;
}