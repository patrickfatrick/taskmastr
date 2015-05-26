var config = {};

config.mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/rtr';

module.exports = config;