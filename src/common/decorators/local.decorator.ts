import { createParamDecorator } from '@nestjs/common';
import { RolEntity } from 'src/modules/auth/entities/rol.entity';

export interface LocalData {
	id: string;
	email: string;
	rol: RolEntity;
	confirEmail: boolean;
}

export const Local = createParamDecorator((data, req): LocalData => req.switchToHttp().getRequest().user);
