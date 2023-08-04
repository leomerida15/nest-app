import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigKeyEnum } from 'src/config';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				...configService.get<TypeOrmModuleOptions>(ConfigKeyEnum.DB),
				synchronize: true,
			}),
			inject: [ConfigService],
		}),
	],
})
export class DbModule {}
