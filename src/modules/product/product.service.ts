import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(ProductEntity)
		private readonly productRepository: Repository<ProductEntity>,
	) {}

	async create(createProductDto: CreateProductDto) {
		return await this.productRepository.save(createProductDto);
	}

	async findAll() {
		return await this.productRepository.find();
	}

	async findOne(id: string) {
		return await this.productRepository.findOne({ where: { id } });
	}

	async update(id: string, updateProductDto: UpdateProductDto) {
		return await this.productRepository.update({ id }, { ...updateProductDto });
	}

	async remove(id: string) {
		return await this.productRepository.delete(id);
	}

	async paginate(options: IPaginationOptions): Promise<Pagination<ProductEntity>> {
		return paginate<ProductEntity>(this.productRepository, options);
	}
}
