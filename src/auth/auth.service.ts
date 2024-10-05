import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/user.login.dto';
import { UsersEntity } from 'src/users/entity/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(UsersEntity)
        private usersRepository: Repository<UsersEntity>
    ) { }
    
    async loginFind(loginUserDto: LoginUserDto): Promise<{ user: UsersEntity, accessToken: string } | null> {
        const { user_name, password } = loginUserDto;
        const user = await this.usersRepository.findOne({ where: { user_name } });

        if (user && user.password === password) {
            const payload = { sub: user.id, username: user.user_name, userrole: user.position };

            // JWT token oluşturma
            const accessToken = await this.jwtService.signAsync(payload);

            // Hem kullanıcıyı hem de token'ı döndür
            return { user, accessToken };
        }

        return null;
    }
}
