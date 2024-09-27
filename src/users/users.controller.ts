import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UsersService } from "./users.service";
import { CreateUserDto } from "./usersDto";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @HttpCode(201)
    async create(@Body() createUserDto: CreateUserDto): Promise<any> {
        return this.usersService.createUser(createUserDto);

    }
}
