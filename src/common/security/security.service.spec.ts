import { Test, TestingModule } from '@nestjs/testing';
import { SecurityService } from './security.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/auth/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

const data = {
	validUser: {
		prop: { email: 'email', password: 'password' },
		resp: { id: 'id', email: 'email', confirEmail: false, rol: 'rol' },
		db: {
			findOneBy: { id: 'id', email: 'email', password: 'password', confirEmail: false, rol: 'rol' },
		},
	},
};

jest.mock('bcrypt', () => ({
	compareSync: jest.fn(() => true),
}));

describe('validateUser', () => {
	const userGetRepository = getRepositoryToken(UserEntity);

	let securityService: SecurityService;
	let userRepository: Repository<UserEntity>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				SecurityService,
				{
					provide: userGetRepository,
					useValue: {
						save: jest.fn(),
						findOneBy: jest.fn(async () => data.validUser.db.findOneBy),
						update: jest.fn(),
					},
				},
			],
		}).compile();

		securityService = module.get<SecurityService>(SecurityService);
		userRepository = module.get<Repository<UserEntity>>(userGetRepository);
	});

	//
	describe('validUser', () => {
		//
		describe('🔷 - OK', () => {
			//
			it('should return an "🔹 - OK" case', async () => {
				const { prop, resp } = data.validUser;

				const result = await securityService.validateUser(prop);

				expect(result).toEqual(resp);
				expect(bcrypt.compareSync).toHaveBeenCalled();
			});
		});
		//
		describe('🔶 - ERROR', () => {
			//
			it('should return an "🔸 - ERROR" case to compareSync return NULL', async () => {
				jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);

				const { prop } = data.validUser;

				const result = await securityService.validateUser(prop);

				expect(result).toBeNull();
				expect(bcrypt.compareSync).toHaveBeenCalled();
				expect(userRepository.findOneBy).toHaveBeenCalled();
			});
			//
			it('should return an "🔸 - ERROR" case to findOneBy return NULL', async () => {
				jest.spyOn(userRepository, 'findOneBy').mockReturnValue(null);

				const { prop } = data.validUser;

				const result = await securityService.validateUser(prop);

				expect(result).toBeNull();
				expect(bcrypt.compareSync).toHaveBeenCalled();
				expect(userRepository.findOneBy).toHaveBeenCalled();
			});
		});
	});
});
