var path = require('path')
var config = require(path.join(__dirname, '/config'))

var r = require('rethinkdbdash')(config.rethinkdb)
require('rethinkdb-init')(r)

module.exports = r
