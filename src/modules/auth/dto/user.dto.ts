import { OmitType, PickType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEnum, IsJWT, IsString, IsUUID, Matches } from 'class-validator';
import configuration from 'src/config/configuration';
import { Rols } from '../entities/rol.entity';

export class UserConfirDto {
	@ApiProperty()
	@IsUUID()
	userId: string;
}

export class UserDto {
	@ApiProperty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@Matches(configuration().global.regexPass)
	@IsString()
	password: string;

	@IsEnum(Rols)
	@ApiProperty({ enum: Rols })
	rol: Rols;
}

export class UserLoginDto extends OmitType(UserDto, ['rol']) {}

export class UserRecoverDto extends PickType(UserDto, ['email']) {}

export class UserEditPassDto extends PickType(UserDto, ['password']) {}

export class UserSetRolDto extends PickType(UserDto, ['rol']) {
	@IsEnum(Rols)
	@ApiProperty({ enum: Rols })
	rol: Rols;
}

export class AuthRespDto {
	@ApiProperty()
	@IsJWT()
	access_token: string;

	@ApiProperty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsBoolean()
	confirEmail: boolean;
}
