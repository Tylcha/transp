import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersEntity } from './users.entity';
import { JwtModule } from '@nestjs/jwt'

@Module({
    imports: [
        TypeOrmModule.forFeature([UsersEntity]),
        JwtModule.register({
            secret: "Secret", //secret key duzenlenicek sonra
            signOptions: { expiresIn: "1h" },// token gecerlilik suresi
        }),
    ],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule { }