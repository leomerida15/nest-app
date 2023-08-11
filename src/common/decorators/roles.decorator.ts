import { SetMetadata } from '@nestjs/common';
import { Rols } from 'src/modules/auth/entities/rol.entity';

export const ROL_KEY = 'rol';
export const Roles = (...rols: Rols[]) => SetMetadata(ROL_KEY, rols);
