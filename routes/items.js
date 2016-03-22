var http = require('http')
var agenda = require('../services/agenda-service')
var itemService = require('../services/item-service')

var items = {
  create: function * (next) {
    var ctx = this
    var listid = this.params.listid
    var item = this.request.body.item

    try {
      var result = yield itemService.addItem(listid, item)
      if (!result) ctx.throw(500, 'Something bad happened at addItem')
      ctx.body = result
    } catch (e) {
      this.status = e.status || 500
      this.body = e.message || http.STATUS_CODES[this.status]
    }
  },
  delete: function * (next) {
    var ctx = this
    var listid = this.params.listid
    var itemid = this.params.itemid
    var index = this.request.body.index

    try {
      var result = yield itemService.deleteItem(listid, index)
      if (!result) ctx.throw(500, 'Something bad happened at deleteItem')
      // Cancel agenda if it exists
      agenda.cancel({
        'data.agendaID': itemid
      }, (err) => {
        if (err) ctx.throw(err)
        console.log(`${itemid} => Agenda canceled`)
      })
      ctx.body = result
    } catch (e) {
      this.status = e.status || 500
      this.body = e.message || http.STATUS_CODES[this.status]
    }
  }
}

module.exports = items