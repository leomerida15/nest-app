import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as path from 'path';

ConfigModule.forRoot({
	envFilePath: `.env`,
});

export const AppDS = new DataSource({
	type: 'postgres',
	host: process.env.PGHOST,
	port: Number(process.env.PGPORT),
	username: process.env.PGUSER,
	password: process.env.PGPASSWORD,
	database: process.env.PGDATABASE,
	logging: Boolean(process.env.DB_LOG),
	synchronize: false,
	migrationsRun: true,
	namingStrategy: new SnakeNamingStrategy(),
	entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
	migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
});
