const config = require('./config')
const thinky = require('thinky')(config.rethinkdb)

module.exports = thinky
