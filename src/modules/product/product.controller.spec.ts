import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import GlobalConfig from 'src/config/global';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

const enum ConfigKeys {
	GLOBAL = 'global',
}

describe('ProductController', () => {
	let productController: ProductController;
	let productService: ProductService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProductController],
			providers: [
				{
					provide: ProductService,
					useValue: {},
				},
				{
					provide: ConfigService,
					useValue: {
						get: jest.fn((key: ConfigKeys) => {
							const data: Record<ConfigKeys, any> = {
								[ConfigKeys.GLOBAL]: new GlobalConfig(),
							};

							return data[key];
						}),
					},
				},
			],
		}).compile();

		productController = module.get<ProductController>(ProductController);
		productService = module.get<ProductService>(ProductService);
	});

	it('should be defined', () => {
		expect(productController).toBeDefined();
		expect(productService).toBeDefined();
	});
});
