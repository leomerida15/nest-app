import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROL_KEY } from 'src/common/decorators/roles.decorator';
import { Rols } from 'src/modules/auth/entities/rol.entity';
import { ConfigService } from '@nestjs/config';
import { ConfigKeysCEnum } from 'src/config/configuration';
import RolsConfig from 'src/config/rol';

@Injectable()
export class RolAuthGuard implements CanActivate {
	constructor(private reflector: Reflector, private readonly configService: ConfigService) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const rolKey = this.reflector.getAllAndOverride<Rols>(ROL_KEY, [context.getHandler(), context.getClass()]);

		const rol = this.configService.get<RolsConfig>(ConfigKeysCEnum.ROLS)[rolKey];

		const userRolId = context.switchToHttp().getRequest().user.rolId;

		return userRolId === rol;
	}
}
