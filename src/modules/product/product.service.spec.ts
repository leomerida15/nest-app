import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductService } from './product.service';

describe('ProductService', () => {
	const productGetRepository = getRepositoryToken(ProductEntity);

	let productRepository: Repository<ProductEntity>;
	let productService: ProductService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ProductService,
				{
					provide: productGetRepository,
					useValue: {},
				},
			],
		}).compile();

		productService = module.get<ProductService>(ProductService);
		productRepository = module.get<Repository<ProductEntity>>(productGetRepository);
	});

	it('should be defined', () => {
		expect(productService).toBeDefined();
		expect(productRepository).toBeDefined();
	});
});
