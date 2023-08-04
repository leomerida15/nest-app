export default class GlobalConfig {
	regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?\.&.])([A-Za-z\d$@$!%*?&.]|[^ ]){8,15}$/;

	port = process.env.PORT;

	name = process.env.NAME;

	host = process.env.HOST;
}
