import { RolAuthGuard } from './rol-auth.guard';

describe('RolAuthGuard', () => {
	it('should be defined', () => {
		expect(new RolAuthGuard()).toBeDefined();
	});
});
