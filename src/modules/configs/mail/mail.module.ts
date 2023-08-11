import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import MailConfig from 'src/config/mail';

@Module({
	imports: [
		MailerModule.forRootAsync({
			imports: [ConfigModule],

			useFactory: (configService: ConfigService) => ({
				transport: {
					service: 'Gmail',
					auth: configService.get<MailConfig>('mail'),
				},
			}),

			inject: [ConfigService],
		}),
	],
})
export class MailModule {}
