import { IsEnum, IsNotEmpty, IsString, Length, MinLength } from "class-validator"
import { Role } from "./users.role.enum";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @Length(11, 11)
    tc: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    password: string;

    @IsEnum(Role, { each: true })
    roles:Role[];

}