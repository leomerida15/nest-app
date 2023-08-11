import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	DefaultValuePipe,
	HttpCode,
	HttpStatus,
	ParseIntPipe,
	Query,
	UseGuards,
	Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CreateCategoryDto } from '../category/dto/create-category.dto';
import { ConfigService } from '@nestjs/config';
import { ProductEntity } from './entities/product.entity';
import GlobalConfig from 'src/config/global';
import { JwtAuthGuard } from 'src/common/security/guards/jwt-auth.guard';
import { ConfirAuthGuard } from 'src/common/security/guards/confir-auth.guard';

@ApiTags('Product')
@ApiBearerAuth()
@Controller('product')
@UseGuards(JwtAuthGuard, ConfirAuthGuard)
export class ProductController {
	constructor(private readonly productService: ProductService, private readonly configService: ConfigService) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@ApiBody({
		type: CreateProductDto,
	})
	@ApiCreatedResponse({
		type: CreateProductDto,
	})
	async create(@Body() createProductDto: CreateProductDto) {
		return await this.productService.create(createProductDto);
	}

	@Get('all')
	@HttpCode(HttpStatus.OK)
	@ApiCreatedResponse({
		type: CreateCategoryDto,
		isArray: true,
	})
	async findAll() {
		return await this.productService.findAll();
	}

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	@ApiCreatedResponse({
		type: CreateCategoryDto,
	})
	async findOne(@Param('id') id: string) {
		return await this.productService.findOne(id);
	}

	@Put(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
		await this.productService.update(id, updateProductDto);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	async remove(@Param('id') id: string) {
		await this.productService.remove(id);
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	@ApiCreatedResponse({
		type: CreateCategoryDto,
		isArray: true,
	})
	@ApiQuery({ name: 'page', type: 'number' })
	@ApiQuery({ name: 'limit', type: 'number' })
	async index(
		@Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
		@Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
	): Promise<Pagination<ProductEntity>> {
		limit = limit > 100 ? 100 : limit;
		return this.productService.paginate({
			page,
			limit,
			route: `${this.configService.get<GlobalConfig>('global').host}/v1/product`,
		});
	}
}
