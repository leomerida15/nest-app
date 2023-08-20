import configuration from './config/configuration';
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { ConfigModule } from '@nestjs/config';
import { SecurityModule } from './common/security/security.module';
import { MailModule } from './modules/configs/mail/mail.module';
import { DbModule } from './modules/configs/db/db.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration],
		}),
		SecurityModule,
		AuthModule,
		CategoryModule,
		ProductModule,
		MailModule,
		DbModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
