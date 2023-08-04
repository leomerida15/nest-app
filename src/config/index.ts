import dbConfig from './db';
import GlobalConfig from './global';

class Configuration {
	database = dbConfig();

	global = new GlobalConfig();
}

export const enum ConfigKeyEnum {
	GLOBAL = 'global',
	DB = 'database',
}

export const configuration = () => new Configuration();
