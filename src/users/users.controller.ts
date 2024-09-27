import { Body, Controller, HttpCode, Post, Param, Get } from '@nestjs/common';
import { UsersService } from "./users.service";
import { CreateUserDto } from "./usersDto";
import { UsersEntity } from "./users.entity";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @HttpCode(201)
    async create(@Body() createUserDto: CreateUserDto): Promise<UsersEntity> {
        return this.usersService.createUser(createUserDto);

    }

    @Get(":id")
    async findOne(@Param("id") id: string): Promise<UsersEntity> {
        const user = await this.usersService.findOneUser(+id); //idyi numbera ceviriyoruz.
        return user; //kullanici nesnesini dondur
    }

    @Get()
    async findAllForDate(): Promise<UsersEntity[]> {
        const users = await this.usersService.findAllUser(); 
        return users;
    }
}
