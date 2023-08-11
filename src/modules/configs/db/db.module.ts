import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigKeysEnum } from 'src/config/configuration';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => {
				console.log(
					'configService.get<TypeOrmModuleOptions>(ConfigKeysEnum.DB)',
					configService.get<TypeOrmModuleOptions>(ConfigKeysEnum.DB),
				);
				return {
					...configService.get<TypeOrmModuleOptions>(ConfigKeysEnum.DB),
					synchronize: true,
				};
			},
			inject: [ConfigService],
		}),
	],
})
export class DbModule {}
