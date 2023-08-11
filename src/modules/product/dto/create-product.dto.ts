import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsJSON, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateProductDto {
	@IsString()
	@Transform(({ value }) => String(value).toLowerCase())
	@ApiProperty()
	name: string;

	@IsNumber()
	@ApiProperty()
	price: number;

	@IsNumber()
	@ApiProperty()
	stog: number;

	@IsArray()
	@IsJSON({ each: true })
	@ApiProperty()
	imgs: {
		image: { get: string; delete: string };
		thumb: { get: string; delete: string };
		medium: { get: string; delete: string };
	}[];

	@IsString()
	@IsUUID()
	@ApiProperty()
	category: string;
}
