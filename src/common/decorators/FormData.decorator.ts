import { createParamDecorator } from '@nestjs/common';

export const FormatData = createParamDecorator((data, req) => {
	const { body } = req.switchToHttp().getRequest();

	const bodyEntries = Object.entries(body);

	const bodyFormatOK = Object.fromEntries(bodyEntries);

	return bodyFormatOK;
});
