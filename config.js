const singleDay = 1000 * 60 * 60 * 24
const mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/rtr'

module.exports = {
  static: {
    maxage: singleDay,
    gzip: true
  },
  koa: {
    port: process.env.PORT || 3000
  },
  mongoose: {
    url: mongoUri
  },
  session: {
    url: mongoUri,
    collection: 'sessions'
  },
  agendaOptions: {
    db: {
      address: mongoUri,
      collection: 'agendaJobs'
    }
  },
  cookieMaxAge: singleDay * 30,
  compress: {
    filter: function (contentType) {
      return /text/i.test(contentType)
    },
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
  },
  slogger: {
    minimal: process.env.QUIET
  }
}
