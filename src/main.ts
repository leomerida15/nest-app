import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ConfigKeyEnum } from './config';

async function bootstrap() {
	// define http frameware
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

	// Config
	const config = app.get(ConfigService);
	const { name, port } = config.get(ConfigKeyEnum.GLOBAL);

	// prefig
	app.setGlobalPrefix('v1');

	// valid
	app.useGlobalPipes(new ValidationPipe());

	// cors
	app.enableCors();

	// swagger
	const swaggerConfig = new DocumentBuilder()
		.addBearerAuth()
		.setTitle(name)
		.setDescription(`The ${name} API description`)
		.setVersion('1.0')
		.addTag(name)
		.setExternalDoc('Postman Collection', 'api-json')
		.build();
	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup('api', app, document);

	//  Server
	await app.listen(3000);

	// Bonny
	console.log(`() ()   port: ${port}`);
	console.log('(°.°) ');
	console.log('(| |)*');
}
bootstrap();
