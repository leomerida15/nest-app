export default class MailConfig {
	user: string = `${process.env.MAIL_USER}@gmail.com`;
	pass: string = process.env.MAIL_PASS;

	recoverURL = (token: string) => `${process.env.HOST}/auth/recover/${token}`;
	confirmationURL = (token: string) => `${process.env.HOST}/auth/confir/${token}`;
}
