import { Transform } from 'class-transformer';
import { IsDate, IsJSON, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	Unique,
	UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from '../../category/entities/category.entity';

@Entity()
@Unique(['name'])
export class ProductEntity {
	@PrimaryGeneratedColumn('uuid')
	@IsUUID()
	@IsOptional()
	id?: string;

	@Column()
	@IsString()
	@Transform(({ value }) => String(value).toLowerCase())
	name: string;

	@Column()
	@IsNumber()
	price: number;

	@Column({ default: 0 })
	@IsNumber()
	stop: number;

	@Column({ type: 'simple-array', default: [] })
	@IsJSON({ each: true })
	imgs: {
		image: { get: string; delete: string };
		thumb: { get: string; delete: string };
		medium: { get: string; delete: string };
	}[];

	@CreateDateColumn()
	@IsDate()
	createdDate?: Date;

	@UpdateDateColumn()
	@IsDate()
	updatedDate?: Date;

	@ManyToOne(() => CategoryEntity, (CategoryEntity) => CategoryEntity.products)
	@JoinColumn()
	category: CategoryEntity | string;
}
