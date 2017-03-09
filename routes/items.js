'use strict'

const chalk = require('chalk')
const agenda = require('../services/agenda-service')
const itemService = require('../services/item-service')
const listService = require('../services/list-service')

module.exports = {
  create: async function (payload) {
    const listid = payload.listid
    const item = payload.item
    const username = payload.username

    const itemResult = await itemService.addItem(item)
    if (!itemResult) throw new Error('Something bad happened at addItem')
    const listResult = await itemService.addItemToList(listid, item._id)
    if (!listResult) throw new Error('Something bad happened at addItemToList')

    if (item.dueDate) {
      const dueDate = new Date(item.dueDate)
      if (dueDate >= Date.now()) {
        console.log(`${chalk.green(username)} Agenda scheduled ${chalk.gray(item._id)} ${chalk.cyan(item.dueDate)}`)
        agenda.schedule(dueDate, 'Notification Email', {
          agendaID: item._id,
          username: username,
          item: item.item,
          host: process.env.HOST || 'http://localhost:3000',
          date: dueDate
        })
      }
    }

    return listResult
  },
  update: async function (payload) {
    const listid = payload.listid
    const item = payload.item

    const itemResult = await itemService.updateItem(item._id, item)
    if (!itemResult) throw new Error('Something bad happened at updateItem')
    const listResult = await listService.getList(listid)
    if (!listResult) throw new Error('Something bad happened at getList')

    var recipients = listResult.users.map((user) => {
      return user.username
    }).concat(listResult.owner)
    // Cancel whatever the current agenda is, make a new one
    agenda.cancel({
      'data.agendaID': item._id
    }, function (err) {
      if (err) throw err
      if (item.dueDate) {
        const dueDate = new Date(item.dueDate)
        if (dueDate <= Date.now()) return
        console.log(`${chalk.green(recipients.join(', '))} Agenda scheduled ${chalk.gray(item._id)} ${chalk.cyan(item.dueDate)}`)
        agenda.schedule(dueDate, 'Notification Email', {
          agendaID: item._id,
          username: recipients,
          item: item.item,
          host: process.env.HOST || 'http://localhost:3000',
          date: dueDate
        })
      }
    })

    return listResult
  },
  delete: async function (payload) {
    const listid = payload.listid
    const itemid = payload.itemid
    const index = payload.index

    const itemResult = await itemService.deleteItem(itemid)
    if (!itemResult) throw new Error('Something bad happened at deleteItem')
    const listResult = await itemService.deleteItemFromList(listid, index)
    if (!listResult) throw new Error('Something bad happened at deleteItemFromList')

    // Cancel agenda if it exists
    agenda.cancel({
      'data.agendaID': itemid
    }, (err) => {
      if (err) throw new Error(err)
      console.log(`Agenda canceled ${chalk.gray(itemid)} `)
    })

    return listResult
  }
}
