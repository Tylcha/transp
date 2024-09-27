import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';


import { TypeOrmModule } from '@nestjs/typeorm';

//users
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersEntity } from "./users/users.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:"mysql",
      host:"localhost",
      port:3306,
      username:"root",
      password:"tmww1183",
      database:"test",
      entities:[UsersEntity],
      synchronize:true,
    }),
    TypeOrmModule.forFeature([UsersEntity]),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
