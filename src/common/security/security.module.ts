import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/auth/entities/user.entity';
import { SecurityService } from './security.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import JwtConfig from 'src/config/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
	imports: [
		PassportModule,
		TypeOrmModule.forFeature([UserEntity]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => configService.get<JwtConfig>('jwt').GuardConfig,
			inject: [ConfigService],
		}),
	],
	providers: [LocalStrategy, JwtStrategy, SecurityService],
	exports: [SecurityService],
})
export class SecurityModule {}
