import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { IsBoolean, IsEmail, IsOptional, IsString, IsUUID, Matches } from 'class-validator';
import { RolEntity } from './rol.entity';
import configuration from '../../../config/configuration';

@Entity()
@Unique(['email'])
export class UserEntity {
	@PrimaryGeneratedColumn('uuid')
	@IsUUID()
	id?: string;

	@Column()
	@IsEmail()
	email: string;

	@Matches(configuration().global.regexPass)
	@IsString()
	@Column()
	password: string;

	@Column({ default: false })
	@IsBoolean()
	@IsOptional()
	confirEmail: boolean;

	@ManyToOne(() => RolEntity, (RolEntity) => RolEntity.id)
	@JoinColumn()
	rol: string | RolEntity;
}
