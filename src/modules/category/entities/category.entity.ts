import { Transform } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ProductEntity } from '../../product/entities/product.entity';

@Entity()
@Unique(['name'])
export class CategoryEntity {
	@PrimaryGeneratedColumn('uuid')
	@IsUUID()
	id?: string;

	@Column()
	@IsString()
	@Transform(({ value }) => String(value).toLowerCase())
	name: string;

	@OneToMany(() => ProductEntity, (ProductEntity) => ProductEntity.category)
	products?: ProductEntity[];
}
