import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsJSON, IsNumber, IsString, IsUUID, isURL } from 'class-validator';

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
	stop: number;

	@IsArray()
	@IsString({ each: true })
	@ApiProperty({
		isArray: true,
		type: 'string',
	})
	imgs: string[];

	@IsString()
	@IsUUID()
	@ApiProperty()
	category: string;
}
