import { JwtModuleOptions } from '@nestjs/jwt';

export default class JwtConfig {
	GuardConfig: JwtModuleOptions = {
		secret: String(process.env.JWT_KEY),
		signOptions: { expiresIn: process.env.JWT_EXP },
	};
}
