import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles.decorator";
import { Role } from "src/users/enum/users.role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
    ) { }

    canActivate(context: ExecutionContext): boolean {

        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ])

        // Eğer route herhangi bir role ihtiyaç duymuyorsa, erişime izin ver
        if (!requiredRoles) {
            return true;
        }
        
        const request = context.switchToHttp().getRequest();
        const user = request.user // AuthGuard ile token doğrulandıktan sonra gelen user bilgisi
        console.log(user);
        
        // Kullanıcının rolünün array olduğunu varsayarak gerekli roller ile karşılaştırma yapıyoruz
        const hasRole = user.userrole.some((role: Role) => requiredRoles.includes(role));

        if (!user || !user.userrole || !hasRole ) {
            throw new UnauthorizedException('Yetkisiz erişim: Bu alana erişim yetkiniz yok.');
        }

        return true; // Kullanıcının rolü gerekli rollerden biriyse erişim sağlanır

    }
} 