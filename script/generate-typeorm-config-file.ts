import { isArray, isBoolean, isNumberString } from 'class-validator';
import { unlinkSync, writeFileSync, existsSync } from 'fs';
import * as dotenv from 'dotenv';

const generateTypeormConfigFile = async () => {
	dotenv.config();

	if (existsSync('ormconfig.ts')) unlinkSync('ormconfig.ts');

	const typeormConfig = {
		type: 'postgres',
		host: process.env.PGHOST,
		port: Number(process.env.PGPORT),
		username: process.env.PGUSER,
		password: process.env.PGPASSWORD,
		database: process.env.PGDATABASE,
	};

	console.log('typeormConfig', typeormConfig);

	const text = /* sql */ `
  import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
		type: 'postgres',
		host: '${process.env.PGHOST}',
		port: ${Number(process.env.PGPORT)},
		username: '${process.env.PGUSER}',
		password: '${process.env.PGPASSWORD}',
		database: '${process.env.PGDATABASE}',
		migrations: ['./migrations/*.ts'],
		entities: ['./src/modules/**/entities/*.entity.ts'],

});
`;

	writeFileSync('ormconfig.ts', text);
};

generateTypeormConfigFile();
