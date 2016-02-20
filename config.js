module.exports = {
  mongoUri: process.env.MONGOLAB_URI || 'mongodb://localhost:27017/rtr',
  agendaOptions: {
    db: {
      address: process.env.MONGOLAB_URI || 'mongodb://localhost:27017/rtr',
      collection: 'agendaJobs'
    }
  },
  cookieMaxAge: 30 * 24 * 3600 * 1000,
  compression: {
    level: 9
  }
}
