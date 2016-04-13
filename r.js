const path = require('path')
const config = require(path.join(__dirname, '/config'))

const r = require('rethinkdbdash')(config.rethinkdb)
require('rethinkdb-init')(r)

module.exports = r
