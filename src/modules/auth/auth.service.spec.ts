import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import MailConfig from 'src/config/mail';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { Rols, RolEntity } from './entities/rol.entity';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LocalData } from 'src/common/decorators/local.decorator';
import { JwtData } from 'src/common/decorators/jwt.decorator';

const enum ConfigKeys {
	MAIL = 'mail',
}
interface data {
	ok: {
		register: {
			prop: UserDto;
			resp: { access_token: string; email: string };
			db: {
				user: { save: UserEntity };
				rol: { findOneBy: { id: string; name: Rols.USER } };
			};
		};

		login: {
			prop: LocalData;
			resp: { access_token: string; email: string };
		};

		confir: {
			prop: JwtData;
			db: { findOneBy: UserEntity };
		};

		editPass: {
			prop: [JwtData, { password: string }];
			db: { findOneBy: UserEntity };
		};
	};
}

const data: data = {
	ok: {
		register: {
			prop: { email: 'email', password: 'password', rol: Rols.USER },
			resp: { email: 'email', access_token: 'token' },
			db: {
				user: { save: { id: 'id', email: 'email', password: 'password', confirEmail: false, rol: 'rol' } },
				rol: { findOneBy: { id: 'id', name: Rols.USER } },
			},
		},

		login: {
			prop: { email: 'email', id: 'id' },
			resp: { email: 'email', access_token: 'token' },
		},

		confir: {
			prop: { userId: 'id' },
			db: {
				findOneBy: { id: 'id', email: 'email', password: 'password', confirEmail: false, rol: 'rol' },
			},
		},

		editPass: {
			prop: [{ userId: 'id' }, { password: 'password' }],
			db: {
				findOneBy: { id: 'id', email: 'email', password: 'password', confirEmail: false, rol: 'rol' },
			},
		},
	},
};

jest.mock('bcrypt', () => ({
	hashSync: jest.fn(() => 'cryptPass'),
	genSaltSync: jest.fn(),
}));

jest.mock('./mails/createTemplate', () => ({
	confirTemplate: jest.fn(() => ''),
	recoverTemplate: jest.fn(() => ''),
}));

describe('🤖 AuthService', () => {
	const userGetRepository = getRepositoryToken(UserEntity);
	const rolGetRepository = getRepositoryToken(RolEntity);

	let authService: AuthService;
	let userRepository: Repository<UserEntity>;
	let rolRepository: Repository<RolEntity>;
	let mailerService: MailerService;
	let jwtService: JwtService;
	let configService: ConfigService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: JwtService,
					useValue: {
						sign: jest.fn(() => 'token'),
					},
				},
				{
					provide: MailerService,
					useValue: {
						sendMail: jest.fn(),
					},
				},
				{
					provide: userGetRepository,
					useValue: {
						save: jest.fn(async () => data.ok.register.db.user.save),
						findOneBy: jest.fn(async () => data.ok.register.db.rol.findOneBy),
						update: jest.fn(),
					},
				},
				{
					provide: rolGetRepository,
					useValue: {
						findOneBy: jest.fn(async () => data.ok.register.db.rol.findOneBy),
					},
				},
				{
					provide: ConfigService,
					useValue: {
						get: jest.fn((key: ConfigKeys) => {
							const data: Record<ConfigKeys, any> = {
								mail: new MailConfig(),
							};

							return data[key];
						}),
					},
				},
			],
		}).compile();

		authService = module.get<AuthService>(AuthService);
		userRepository = module.get<Repository<UserEntity>>(userGetRepository);
		rolRepository = module.get<Repository<RolEntity>>(rolGetRepository);
		mailerService = module.get<MailerService>(MailerService);
		jwtService = module.get<JwtService>(JwtService);
		configService = module.get<ConfigService>(ConfigService);
	});

	it('should be defined', () => {
		expect(authService).toBeDefined();
		expect(userRepository).toBeDefined();
		expect(mailerService).toBeDefined();
		expect(jwtService).toBeDefined();
	});

	describe('register', () => {
		//
		describe('🔷 - OK ', () => {
			//
			it('should return an "🔹 - OK" case', async () => {
				const { prop, resp } = data.ok.register;

				const result = await authService.register(prop);

				expect(bcrypt.hashSync).toHaveBeenCalled();
				expect(userRepository.save).toHaveBeenCalled();
				expect(rolRepository.findOneBy).toHaveBeenCalled();
				expect(configService.get).toHaveBeenCalledWith('mail');
				expect(mailerService.sendMail).toHaveBeenCalled();
				expect(jwtService.sign).toHaveBeenCalledWith({ data: 'id' });
				expect(result).toEqual(resp);
			});
		});
		//
		describe('🔶 - ERROR', () => {
			//
			it('should return an "🔸 error" to not_find rol', async () => {
				jest.spyOn(rolRepository, 'findOneBy').mockRejectedValue('error');
				try {
					const { prop } = data.ok.register;

					await authService.register(prop);
				} catch (error) {
					expect(bcrypt.hashSync).toHaveBeenCalled();
					expect(rolRepository.findOneBy).toHaveBeenCalled();
					expect(userRepository.save).not.toHaveBeenCalled();
					expect(configService.get).not.toHaveBeenCalledWith('mail');
					expect(mailerService.sendMail).not.toHaveBeenCalled();
					expect(jwtService.sign).not.toHaveBeenCalled();

					expect(error).toBe('error');
				}
			});
			//
			it('should return an "🔸 error" to save user', async () => {
				jest.spyOn(userRepository, 'save').mockRejectedValue('error');
				try {
					const { prop } = data.ok.register;

					await authService.register(prop);
				} catch (error) {
					expect(bcrypt.hashSync).toHaveBeenCalled();
					expect(rolRepository.findOneBy).toHaveBeenCalled();
					expect(userRepository.save).toHaveBeenCalled();
					expect(configService.get).not.toHaveBeenCalledWith('mail');
					expect(mailerService.sendMail).not.toHaveBeenCalled();
					expect(jwtService.sign).not.toHaveBeenCalled();

					expect(error).toBe('error');
				}
			});
			//
			it('should return an "🔸 error" to save user', async () => {
				jest.spyOn(userRepository, 'save').mockRejectedValue('error');
				try {
					const { prop } = data.ok.register;

					await authService.register(prop);
				} catch (error) {
					expect(bcrypt.hashSync).toHaveBeenCalled();
					expect(rolRepository.findOneBy).toHaveBeenCalled();
					expect(userRepository.save).toHaveBeenCalled();
					expect(configService.get).not.toHaveBeenCalledWith('mail');
					expect(mailerService.sendMail).not.toHaveBeenCalled();
					expect(jwtService.sign).not.toHaveBeenCalled();

					expect(error).toBe('error');
				}
			});
			//
			it('should return an "🔸 error" to sendMail', async () => {
				jest.spyOn(mailerService, 'sendMail').mockRejectedValue('error');
				try {
					const { prop } = data.ok.register;

					await authService.register(prop);
				} catch (error) {
					expect(bcrypt.hashSync).toHaveBeenCalled();
					expect(rolRepository.findOneBy).toHaveBeenCalled();
					expect(userRepository.save).toHaveBeenCalled();
					expect(configService.get).toHaveBeenCalledWith('mail');
					expect(mailerService.sendMail).toHaveBeenCalled();
					expect(jwtService.sign).toHaveBeenCalled();

					expect(error).toBe('error');
				}
			});
		});
	});
	//
	describe('login', () => {
		//
		describe('🔷 - OK ', () => {
			//
			it('should return an "🔹 - OK" case', async () => {
				const { prop, resp } = data.ok.login;

				const result = await authService.login(prop);

				expect(jwtService.sign).toHaveBeenCalledWith({ data: 'id' });
				expect(result).toEqual(resp);
			});
		});
	});
	//
	describe('confir', () => {
		//
		describe('🔷 - OK ', () => {
			//
			it('should return an "🔹 - OK" case', async () => {
				const { prop } = data.ok.confir;

				await authService.confir(prop);

				expect(userRepository.findOneBy).toHaveBeenCalled();
				expect(userRepository.update).toHaveBeenCalled();
			});
		});
		//
		describe('🔶 - ERROR', () => {
			//
			it('should return an "🔸 error" to NOT_FIND user', async () => {
				jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);
				try {
					const { prop } = data.ok.confir;

					await authService.confir(prop);
				} catch (error) {
					expect(userRepository.findOneBy).toHaveBeenCalled();
					expect(userRepository.update).not.toHaveBeenCalled();
				}
			});
		});
	});

	describe('editPass', () => {
		//
		describe('🔷 - OK ', () => {
			//
			it('should return an "🔹 - OK" case', async () => {
				const { prop } = data.ok.editPass;

				await authService.editPass(...prop);

				expect(userRepository.findOneBy).toHaveBeenCalled();
				expect(userRepository.update).toHaveBeenCalled();
			});
		});
		//
		describe('🔶 - ERROR', () => {
			//
			it('should return an "🔸 error" to NOT_FIND user', async () => {
				jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);
				try {
					const { prop } = data.ok.editPass;

					await authService.editPass(...prop);
				} catch (error) {
					expect(userRepository.findOneBy).toHaveBeenCalled();
					expect(userRepository.update).not.toHaveBeenCalled();
				}
			});
		});
	});
});
