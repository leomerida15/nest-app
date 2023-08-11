import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class RolDto {
	@IsUUID()
	@IsOptional()
	id?: string;

	@IsString()
	@Transform(({ value }) => String(value).toLowerCase())
	name: string;
}
