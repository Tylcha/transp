import { Body, Controller, HttpCode, Post, Param, Get, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/usersDto";
import { UsersEntity } from "./entity/users.entity";
import { LoginUserDto } from './dto/user.login.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @HttpCode(201)
    async create(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<UsersEntity> {
        return this.usersService.createUser(createUserDto);

    }

    @Get(":id")
    async findOne(@Param("id", ParseIntPipe) id: string): Promise<UsersEntity> {
        const user = await this.usersService.findOneUser(+id); //idyi numbera ceviriyoruz.
        return user; //kullanici nesnesini dondur
    }

    @Get()
    async findAllForDate(): Promise<UsersEntity[]> {
        const users = await this.usersService.findAllUser();
        return users;
    }

    @Post('login')
    async login(@Body(ValidationPipe) loginUserDto: LoginUserDto) {
        const user = await this.usersService.loginFind(loginUserDto);
        if (user) {
            return { message: "Login successful", user }
        } else {
            return { message: "Login failed" }
        }
    }
}
