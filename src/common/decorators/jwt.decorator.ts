import { createParamDecorator } from '@nestjs/common';

export interface JwtData {
	userId: string;
	rolId: string;
	confirEmail: boolean;
}

export const JWT = createParamDecorator((_, req): JwtData => req.switchToHttp().getRequest().user);
