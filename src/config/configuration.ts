import dbConfig from './db';
import GlobalConfig from './global';
import JwtConfig from './jwt';
import MailConfig from './mail';
import { RolsConfig } from './rol';

export const enum ConfigKeys {
	DB = 'db',
	JWT = 'jwt',
	MAIL = 'mail',
	ROLS = 'rols',
	GLOBAL = 'global',
}

export default function configuration() {
	return {
		db: dbConfig(),
		jwt: new JwtConfig(),
		mail: new MailConfig(),
		rols: new RolsConfig(),
		global: new GlobalConfig(),
	};
}
