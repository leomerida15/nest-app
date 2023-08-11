import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
	@IsString()
	@Transform(({ value }) => String(value).toLowerCase())
	@ApiProperty()
	name: string;
}
