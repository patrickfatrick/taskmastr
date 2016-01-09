var config = {};

config.mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/rtr';
config.agendaOptions = {
	db: {
		address: process.env.MONGOLAB_URI || 'mongodb://localhost:27017/rtr', 
		collection: 'agendaJobs'
	}
};
config.cookieMaxAge = 30 * 24 * 3600 * 1000;
config.compression = {
	level: 9
};

module.exports = config;
