import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import configuration from 'src/config/configuration';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: configuration().jwt.GuardConfig.secret,
		});
	}

	async validate(payload: { data: [string, string, boolean] }) {
		console.log('payload', payload);
		return { userId: payload.data[0], rolId: payload.data[1], confirEmail: payload.data[2] };
	}
}
