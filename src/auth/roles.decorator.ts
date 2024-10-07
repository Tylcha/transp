import { SetMetadata } from "@nestjs/common";
import { Role } from "../users/enum/users.role.enum";

// 'roles' adında bir metadata key'i oluşturuyoruz
export const ROLES_KEY = 'roles';

// ...roles parametresi birden fazla role alabilir. Bu roller metadata olarak eklenir
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY,roles);