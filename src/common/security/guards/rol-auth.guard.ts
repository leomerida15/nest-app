import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROL_KEY } from 'src/common/decorators/roles.decorator';
import { Rols } from 'src/modules/auth/entities/rol.entity';
import { ConfigService } from '@nestjs/config';
import { ConfigKeysEnum } from 'src/config/configuration';
import RolsConfig from 'src/config/rol';

@Injectable()
export class RolAuthGuard implements CanActivate {
	constructor(private reflector: Reflector, private readonly configService: ConfigService) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const rolKey = this.reflector.getAllAndOverride<Rols>(ROL_KEY, [context.getHandler(), context.getClass()]);

		console.log('rolKey', rolKey);

		const rol = this.configService.get<RolsConfig>(ConfigKeysEnum.ROLS)[rolKey];

		console.log('rol', rol);

		const userRolId = context.switchToHttp().getRequest().user.rolId;

		console.log('userRolId', userRolId);

		console.log('userRolId === rol', userRolId === rol);

		return userRolId === rol;
	}
}
