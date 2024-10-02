import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from "./dto/usersDto";
import { UsersEntity } from "./entity/users.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LoginUserDto } from "./dto/user.login.dto";

import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>,
        private jwtService: JwtService,
    ) { }
    async createUser(createUserDto: CreateUserDto): Promise<UsersEntity> {

        // console.log(createUserDto);
        // console.log("tc", createUserDto.tc);
        // console.log("pass", createUserDto.password);
        // console.log("rol", createUserDto.roles);

        //Create Database
        const user = this.usersRepository.create({
            tc: createUserDto.tc,
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
    async loginFind(loginUserDto: LoginUserDto): Promise<{ user: UsersEntity, accessToken: string } | null> {
        const { tc, password } = loginUserDto;
        const user = await this.usersRepository.findOne({ where: { tc } });

        if (user && user.password === password) {
            const payload = { sub: user.id, username: user.id, userrole: user.position };

            // JWT token oluşturma
            const accessToken = this.jwtService.sign(payload);

            // Hem kullanıcıyı hem de token'ı döndür
            return { user, accessToken };
        }

        return null;
    }
}
