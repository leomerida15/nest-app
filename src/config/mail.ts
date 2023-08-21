export default class MailConfig {
	user: string = process.env.MAIL_USER;
	pass: string = process.env.MAIL_PASS;

	recoverURL = (token: string) => `${process.env.HOST}/v1/auth/recover/${token}`;
	confirmationURL = (token: string) => `${process.env.HOST}/v1/auth/confir/${token}`;
}
