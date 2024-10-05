import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from "./dto/usersDto";
import { UsersEntity } from "./entity/users.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>,
    ) { }
    async createUser(createUserDto: CreateUserDto): Promise<UsersEntity> {

        // console.log(createUserDto);
        // console.log("tc", createUserDto.tc);
        // console.log("pass", createUserDto.password);
        // console.log("rol", createUserDto.roles);

        //Create Database
        const user = this.usersRepository.create({
            user_name: createUserDto.user_name,
            full_name:createUserDto.full_name,
            password: createUserDto.password,
            create_time: new Date(),
            position: createUserDto.roles
        });
        await this.usersRepository.save(user);
        return user
    }
    async findOneUser(id: number): Promise<UsersEntity> {
        const user = await this.usersRepository.findOneBy({ id })
        if (!user) {
            throw new NotFoundException(`${id}'id li user yok`)
        }
        return user
    }
    
    async findAllUser(): Promise<UsersEntity[]> {
        const user = await this.usersRepository.find({
            order: {
                create_time: 'DESC', //yeni olusturulma tarihinden eskiye tam tersi ASC
            }
        });
        return user
    }
}
