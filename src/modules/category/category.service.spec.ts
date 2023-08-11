import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entities/category.entity';

const data = {
	create: {
		prop: { name: 'test' },
		resp: { name: 'test' },
		db: {
			save: { name: 'test' },
			findOneBy: { name: 'test' },
		},
	},
};

describe('CategoryService', () => {
	const categoryGetRepository = getRepositoryToken(CategoryEntity);

	let categoryRepository: Repository<CategoryEntity>;
	let categoryService: CategoryService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CategoryService,
				{
					provide: categoryGetRepository,
					useValue: {
						save: jest.fn(async () => data.create.db.save),
						findOneBy: jest.fn(async () => data.create.db.findOneBy),
						update: jest.fn(),
					},
				},
			],
		}).compile();

		categoryService = module.get<CategoryService>(CategoryService);
		categoryRepository = module.get<Repository<CategoryEntity>>(categoryGetRepository);
	});

	it('should be defined', () => {
		expect(categoryService).toBeDefined();
		expect(categoryRepository).toBeDefined();
	});
});
