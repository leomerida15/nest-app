import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserDto, UserEditPassDto, UserRecoverDto } from './dto/user.dto';
import { RolEntity, Rols } from './entities/rol.entity';
import { LocalData } from '../../common/decorators/local.decorator';
import { JwtData } from 'src/common/decorators/jwt.decorator';

const AuthRespData = { email: 'test@test.com', access_token: 'aaaaaa' };

const AuthRegisterData: UserDto = {
	email: 'test@test.com',
	password: 'Test123.',
	rol: Rols.USER,
};

const AuthLoginData: LocalData = {
	email: 'test@test.com',
	id: 'Test123.',
	rol: new RolEntity(),
	confirEmail: false,
};

const jwtData: JwtData = {
	userId: 'UUID',
	rolId: '',
	confirEmail: false,
};

const editPassData: [JwtData['userId'], UserEditPassDto] = [jwtData.userId, { password: 'Test123.' }];

describe('AuthController 🔐', () => {
	let authController: AuthController;
	let authService: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				{
					provide: AuthService,
					useValue: {
						register: jest.fn(async () => AuthRespData),
						login: jest.fn(async () => AuthRespData),
						recover: jest.fn(),
						editPass: jest.fn(),
						confir: jest.fn(),
					},
				},
			],
		}).compile();

		authController = module.get<AuthController>(AuthController);
		authService = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(authController).toBeDefined();
		expect(authService).toBeDefined();
	});

	describe('register', () => {
		//
		describe('OK - 🔷', () => {
			//
			it('should return an email and access_token', async () => {
				const result = await authController.register(AuthRegisterData);

				expect(authService.register).toHaveBeenCalled();
				expect(result).toBe(AuthRespData);
			});
		});
		//
		describe('ERROR - 🔶', () => {
			//
			it('should return an "error"n', async () => {
				jest.spyOn(authService, 'register').mockRejectedValue('error');
				try {
					await authController.register(AuthRegisterData);
				} catch (error) {
					expect(authService.register).toHaveBeenCalled();
					expect(error).toBe('error');
				}
			});
		});
	});

	describe('login', () => {
		//
		describe('OK - 🔷', () => {
			//
			it('should return an email and access_token', async () => {
				const result = await authController.login(AuthLoginData);

				expect(authService.login).toHaveBeenCalled();
				expect(result).toBe(AuthRespData);
			});
		});
		//
		describe('ERROR - 🔶', () => {
			//
			it('should return an "error"', async () => {
				jest.spyOn(authService, 'login').mockRejectedValue('error');
				try {
					await authController.login(AuthLoginData);
				} catch (error) {
					expect(authService.login).toHaveBeenCalled();
					expect(error).toBe('error');
				}
			});
		});
	});

	describe('recover', () => {
		//
		describe('POST', () => {
			//
			describe('OK - 🔷', () => {
				//
				it('should return an email and access_token', async () => {
					await authController.recover(AuthLoginData);

					expect(authService.recover).toHaveBeenCalled();
				});
			});
			//
			describe('ERROR - 🔶', () => {
				//
				it('should return an "error"', async () => {
					jest.spyOn(authService, 'recover').mockRejectedValue('error');
					try {
						await authController.recover(AuthLoginData);
					} catch (error) {
						expect(authService.recover).toHaveBeenCalled();
						expect(error).toBe('error');
					}
				});
			});
		});
		//
		describe('PACTH', () => {
			//
			describe('OK - 🔷', () => {
				//
				it('should return an email and access_token', async () => {
					await authController.editPass(...editPassData);

					expect(authService.editPass).toHaveBeenCalled();
				});
			});
			//
			describe('ERROR - 🔶', () => {
				//
				it('should return an "error"', async () => {
					jest.spyOn(authService, 'recover').mockRejectedValue('error');
					try {
						await authController.editPass(...editPassData);
					} catch (error) {
						expect(authService.editPass).toHaveBeenCalled();
						expect(error).toBe('error');
					}
				});
			});
		});
	});
	//
	describe('confir', () => {
		//
		describe('OK - 🔷', () => {
			//
			it('should return an email and access_token', async () => {
				await authController.confir(jwtData.userId);

				expect(authService.confir).toHaveBeenCalled();
			});
		});
		//
		describe('ERROR - 🔶', () => {
			//
			it('should return an "error"', async () => {
				jest.spyOn(authService, 'confir').mockRejectedValue('error');
				try {
					await authController.confir(jwtData.userId);
				} catch (error) {
					expect(authService.confir).toHaveBeenCalled();
					expect(error).toBe('error');
				}
			});
		});
	});
});
