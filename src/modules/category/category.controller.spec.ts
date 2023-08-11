import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import GlobalConfig from '../../config/global';

const enum ConfigKeys {
	GLOBAL = 'global',
}

describe('CategoryController', () => {
	let categoryController: CategoryController;
	let categoryService: CategoryService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CategoryController],
			providers: [
				{
					provide: CategoryService,
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

		categoryController = module.get<CategoryController>(CategoryController);
		categoryService = module.get<CategoryService>(CategoryService);
	});

	it('should be defined', () => {
		expect(categoryController).toBeDefined();
		expect(categoryService).toBeDefined();
	});
});
