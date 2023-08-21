import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { ConfigKeysCEnum } from 'src/config/configuration';
import JwtConfig from 'src/config/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
