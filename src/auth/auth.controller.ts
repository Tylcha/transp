import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors, ValidationPipe, Request } from '@nestjs/common';
import { LoginUserDto } from './dto/user.login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './authGuard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('login')
    async login(@Body(ValidationPipe) loginUserDto: LoginUserDto) {
        const user = await this.authService.loginFind(loginUserDto);
        // console.log(user);

        if (user) {
            return { message: "Login successful", user }
        } else {
            return { message: "Login failed" }
        }
    }

    @UseGuards(AuthGuard)
    @Get('asd')
    async neww(@Request() req){
        console.log(req.user);
        return req.user
        
    }
}
