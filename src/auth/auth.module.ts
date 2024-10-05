import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UsersEntity } from '../users/entity/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),
    JwtModule.register({
        global:true, //cok onemli yoksa dependency atip duruyor
        secret: "Secret", //secret key duzenlenicek sonra
        signOptions: { expiresIn: "30s" },// token gecerlilik suresi
    }),
    UsersModule,
],
  providers: [AuthService],
  controllers: [AuthController],
  exports:[AuthService],
})
export class AuthModule {}
