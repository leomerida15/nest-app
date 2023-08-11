import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(CategoryEntity)
		private readonly categoryRepository: Repository<CategoryEntity>,
	) {}

	async create(createCategoryDto: CreateCategoryDto) {
		return await this.categoryRepository.save(createCategoryDto);
	}

	async findAll() {
		return await this.categoryRepository.find();
	}

	async findOne(id: string) {
		return await this.categoryRepository.findOneBy({ id });
	}

	async update(id: string, updateCategoryDto: UpdateCategoryDto) {
		await this.categoryRepository.update({ id }, updateCategoryDto);
	}

	async remove(id: string) {
		await this.categoryRepository.delete(id);
	}

	async paginate(options: IPaginationOptions): Promise<Pagination<CategoryEntity>> {
		return paginate<CategoryEntity>(this.categoryRepository, options);
	}
}
