import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigKeysCEnum } from 'src/config/configuration';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				...configService.get<TypeOrmModuleOptions>(ConfigKeysCEnum.DB),
			}),
			inject: [ConfigService],
		}),
	],
})
export class DbModule {}
