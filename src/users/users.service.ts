import { Injectable } from '@nestjs/common';
import { CreateUserDto } from "./usersDto";
import { UsersEntity } from "./users.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>
    ) { }
    async createUser(createUserDto: CreateUserDto): Promise<UsersEntity> {
        console.log("tc", createUserDto.tc);
        console.log("pass", createUserDto.password);
        console.log("rol", createUserDto.roles);
        
        const user = this.usersRepository.create({
            tc: createUserDto.tc,
            password: createUserDto.password,
            create_time: new Date(),
            position:createUserDto.roles
        });
        await this.usersRepository.save(user);
        return user

    }
}
