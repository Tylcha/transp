import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module'; // UsersModule import edildi
import { UsersEntity } from './users/users.entity';
import { JwtModule } from '@nestjs/jwt'


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'tmww1183',
      database: 'test',
      entities: [UsersEntity],
      synchronize: true,
    }),
    UsersModule, // UsersModule burada eklendi
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
