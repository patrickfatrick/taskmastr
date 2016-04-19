'use strict'

const http = require('http')
const agenda = require('../services/agenda-service')
const itemService = require('../services/item-service')

const items = {
  create: function * (next) {
    const ctx = this
    const listid = this.params.listid
    const item = this.request.body.item
    const username = this.request.body.username

    try {
      const result = yield itemService.addItem(listid, item)
      if (!result) ctx.throw(500, 'Something bad happened at addItem')
      if (item.dueDate) {
        console.log(item.dueDate)
        const dueDate = new Date(item.dueDate)
        if (dueDate >= Date.now()) {
          console.log(`${username} => Agenda scheduled: ${item.id} ${item.dueDate}`)
          agenda.schedule(dueDate, 'Notification Email', {
            agendaID: item.id,
            username: username,
            item: item.item,
            host: ctx.origin,
            date: dueDate
          })
        }
      }
      ctx.body = result
    } catch (e) {
      console.log(e)
      this.status = e.status || 500
      this.body = e.message || http.STATUS_CODES[this.status]
    }
  },
  update: function * (next) {
    const ctx = this
    const listid = this.params.listid
    const itemid = this.params.itemid
    const username = this.request.body.username
    const index = this.request.body.index
    const item = this.request.body.item

    try {
      const result = yield itemService.updateItem(listid, index, item)
      if (!result) ctx.throw(500, 'Something bad happened at updateItem')

      // Cancel whatever the current agenda is, make a new one
      agenda.cancel({
        'data.agendaID': itemid
      }, function (err) {
        if (err) throw err
        if (item.dueDate) {
          const dueDate = new Date(item.dueDate)
          if (dueDate <= Date.now()) return
          console.log(`${username} => Agenda scheduled: ${itemid} ${dueDate}`)
          agenda.schedule(dueDate, 'Notification Email', {
            agendaID: itemid,
            username: username,
            item: item.item,
            host: ctx.origin,
            date: dueDate
          })
        }
      })
      ctx.body = result
    } catch (e) {
      console.log(e)
      this.status = e.status || 500
      this.body = e.message || http.STATUS_CODES[this.status]
    }
  },
  delete: function * (next) {
    const ctx = this
    const listid = this.params.listid
    const itemid = this.params.itemid
    const index = this.request.body.index

    try {
      const result = yield itemService.deleteItem(listid, index)
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
      console.log(e)
      this.status = e.status || 500
      this.body = e.message || http.STATUS_CODES[this.status]
    }
  }
}

module.exports = items
