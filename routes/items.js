'use strict'

const chalk = require('chalk')
const agenda = require('../services/agenda-service')
const itemService = require('../services/item-service')

const items = {
  create: function (payload) {
    const listid = payload.listid
    const item = payload.item
    const username = payload.username

    return itemService.addItem(listid, item)
    .then((result) => {
      if (!result) throw new Error('Something bad happened at addItem')
      if (item.dueDate) {
        const dueDate = new Date(item.dueDate)
        if (dueDate >= Date.now()) {
          console.log(`${chalk.green(username)} Agenda scheduled ${chalk.gray(item.id)} ${chalk.cyan(item.dueDate)}`)
          agenda.schedule(dueDate, 'Notification Email', {
            agendaID: item.id,
            username: username,
            item: item.item,
            host: (process.env.NODE_ENV === 'production') ? 'taskmastr.co' : 'localhost:3000',
            date: dueDate
          })
        }
      }

      return result
    })
  },
  update: function (payload) {
    const listid = payload.listid
    const itemid = payload.itemid
    const username = payload.username
    const index = payload.index
    const item = payload.item

    return itemService.updateItem(listid, index, item)
    .then((result) => {
      if (!result) throw new Error('Something bad happened at updateItem')

      // Cancel whatever the current agenda is, make a new one
      agenda.cancel({
        'data.agendaID': itemid
      }, function (err) {
        if (err) throw err
        if (item.dueDate) {
          const dueDate = new Date(item.dueDate)
          if (dueDate <= Date.now()) return
          console.log(`${chalk.green(username)} Agenda scheduled ${chalk.gray(itemid)} ${chalk.cyan(item.dueDate)}`)
          agenda.schedule(dueDate, 'Notification Email', {
            agendaID: itemid,
            username: username,
            item: item.item,
            host: (process.env.NODE_ENV === 'production') ? 'taskmastr.co' : 'localhost:3000',
            date: dueDate
          })
        }
      })

      return result
    })
  },
  delete: function (payload) {
    const listid = payload.listid
    const itemid = payload.itemid
    const index = payload.index

    return itemService.deleteItem(listid, index)
    .then((result) => {
      if (!result) throw new Error('Something bad happened at deleteItem')

      // Cancel agenda if it exists
      agenda.cancel({
        'data.agendaID': itemid
      }, (err) => {
        if (err) throw new Error(err)
        console.log(`Agenda canceled ${chalk.gray(itemid)} `)
      })

      return result
    })
  }
}

module.exports = items
