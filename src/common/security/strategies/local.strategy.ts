import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserLoginDto } from 'src/modules/auth/dto/user.dto';
import { SecurityService } from '../security.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly securityService: SecurityService) {
		super({
			usernameField: 'email',
			passwordField: 'password',
		});
	}

	async validate(email: string, password: string) {
		const data = new UserLoginDto();

		data.email = email;
		data.password = password;
		const user = await this.securityService.validateUser(data);

		if (!user) throw new UnauthorizedException();

		return user;
	}
}
