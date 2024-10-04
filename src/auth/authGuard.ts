import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Role } from '../users/enum/users.role.enum'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        // İsteğin detaylarına ulaşmak
        const request = context.switchToHttp().getRequest();

        // İsteğin başlığından token'ı al
        const token = this.extractTokenFromHeader(request);

        // Eğer token yoksa, kullanıcı yetkilendirilmemiş
        if (!token) {
            throw new UnauthorizedException('Token yok');
        }
        try {
            // Token'ı doğrulama işlemi
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: "Secret" // Token'ı imzalarken kullanılan gizli anahtar
                }
            );

            // Token geçerli ise, payload'u isteğe ekleyerek kullanıcının bilgilerini ekleriz
            request['user'] = payload;
            // console.log(request['user']);
            
        } catch {
             // Eğer token geçersizse (örneğin, süresi dolmuşsa) yetkisiz erişim hatası
            throw new UnauthorizedException('gecersiz token');
        }
        // Token doğrulandıysa, true döner ve kullanıcı rotaya erişebilir
        return true;
    }

    /*Bu metod:
    Başlıkta Authorization olup olmadığını kontrol eder.
    Başlık varsa, Bearer türünde olup olmadığını kontrol eder.
    Eğer Bearer token varsa, token'ı döner. Yoksa undefined döner. */
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}