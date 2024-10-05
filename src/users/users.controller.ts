import { Body, Controller, HttpCode, Post, Param, Get, ParseIntPipe, ValidationPipe, UseInterceptors, ClassSerializerInterceptor, UseGuards } from '@nestjs/common';
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/usersDto";
import { UsersEntity } from "./entity/users.entity";
import { AuthGuard } from 'src/auth/authGuard';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @HttpCode(201)
    @UseGuards(AuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    async create(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<UsersEntity> {
        return this.usersService.createUser(createUserDto);

    }

    @UseGuards(AuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get(":id")
    async findOne(@Param("id", ParseIntPipe) id: string): Promise<UsersEntity> {
        const user = await this.usersService.findOneUser(+id); //idyi numbera ceviriyoruz.
        return user; //kullanici nesnesini dondur
    }

    @UseGuards(AuthGuard)
    @UseInterceptors(ClassSerializerInterceptor) //dont show password
    @Get()
    async findAllForDate(): Promise<UsersEntity[]> {
        const users = await this.usersService.findAllUser();
        return users;
    }
}
