import { IsEnum, IsNotEmpty, IsString, Length, MinLength } from "class-validator"
import { Role } from "../enum/users.role.enum";

export class CreateUserDto {
    @IsNotEmpty({ message: "Kullanici adi bos gecilemez" })
    @IsString()
    @Length(11, 11, { message: "Tc numarasi 11 haneli olmalidir" })
    user_name: string;

    @IsNotEmpty({ message: "Kullanici adi,soyadi bos gecilemez" })
    @IsString()
    // @MinLength(6)
    full_name: string;

    @IsNotEmpty({ message: "Sifre bos gecilemez" })
    @IsString()
    @MinLength(6)
    password: string;

    @IsEnum(Role, { each: true })
    roles: Role[];

}