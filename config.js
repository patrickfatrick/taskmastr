module.exports = {
  koa: {
    port: process.env.PORT || 3000
  },
  rethinkdb: {
    host: process.env.RETHINKDB_HOST || 'localhost',
    port: 28015,
    authKey: process.env.RETHINKDB_AUTH || '',
    db: 'taskmastr'
  },
  rethinkSession: {
    db: 'taskmastr',
    table: 'sessions'
  },
  agendaOptions: {
    db: {
      address: process.env.MONGOLAB_URI || 'mongodb://localhost:27017/rtr',
      collection: 'agendaJobs'
    }
  },
  cookieMaxAge: 30 * 24 * 3600 * 1000,
  compress: {
    filter: function (content_type) {
      return /text/i.test(content_type)
    },
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
  }
}
