import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ConfirAuthGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		console.log(
			'context.switchToHttp().getRequest().user.confirEmail',
			context.switchToHttp().getRequest().user.confirEmail,
		);
		return context.switchToHttp().getRequest().user.confirEmail;
	}
}
