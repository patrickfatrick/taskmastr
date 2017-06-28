'use strict'

const chalk = require('chalk')
const async = require('async')
const userService = require('../services/user-service')
const listService = require('../services/list-service')
const itemService = require('../services/item-service')
const agenda = require('../services/agenda-service')
const errorHandler = require('../utils/error-handler')

module.exports = {
  get: async function (ctx, next) {
    try {
      const result = await listService.getList(ctx.params.listid)
      if (!result) ctx.throw(404, 'List not found with id ' + ctx.params.listid)
      const inUserList = result.users.some((user) => {
        return user.username === ctx.req.user.username
      })
      if (result.owner !== ctx.req.user.username && !inUserList) ctx.throw(403)
      ctx.body = result
    } catch (e) {
      errorHandler(ctx, e)
    }
  },
  create: async function (payload) {
    const list = payload.list
    const user = payload.user

    const listResult = await listService.addList(list)
    if (!listResult) throw new Error('Something bad happened at addList')
    const userResult = await userService.updateUser(user.username, { tasks: user.tasks })
    if (!userResult) throw new Error('Something bad happened at updateUser')

    async.each(list.items, (item, cb) => {
      itemService.addItem(item)
      .then((result) => cb())
    }, function (err) {
      if (err) throw new Error(err)
      console.log(`List items created in bulk ${chalk.gray(listResult._id)}`)
    })

    return { listResult, userResult }
  },
  delete: async function (payload) {
    const user = payload.user
    const listResult = (payload.permanent) ? await listService.deleteList(payload.listid) : { success: true }
    if (!listResult) throw new Error('List not found')
    if (!listResult.success) {
      // Round up the ids of each item and cancel their agenda tasks
      async.each(listResult.items, (itemid, cb) => {
        itemService.deleteItem(itemid)
        .then((result) => {
          agenda.cancel({
            'data.agendaID': itemid
          }, (err) => {
            if (err) throw new Error(err)
            console.log(user.username + ' => Agenda removed: ' + itemid)
            cb()
          })
        })
      }, function (err) {
        if (err) throw new Error(err)
        console.log(`List items removed in bulk ${chalk.gray(listResult._id)}`)
        console.log(`List agendas removed ${chalk.gray(listResult._id)}`)
      })
    }
    const userResult = await userService.updateUser(user.username, { tasks: user.tasks })
    if (!userResult) throw new Error('Something bad happened at updateUser')

    return { listResult, userResult }
  },
  update: async function (payload) {
    const user = payload.user
    const listid = payload.listid
    const listBody = payload.listBody

    const listResult = await listService.updateList(listid, listBody)
    if (!listResult) throw new Error('Something bad happened at updateList')

    const userResult = await userService.updateUser(user.username, { tasks: user.tasks })
    if (!userResult) throw new Error('Something bad happened at updateUser')

    return { listResult, userResult }
  },
  invite: async function (payload) {
    const username = payload.username
    const users = payload.users
    const listid = payload.listid

    const result = await listService.updateList(listid, users)
    if (!result) throw new Error('Something bad happened at updateList')
    agenda.now('List Invite Email', {
      username: username,
      owner: result.owner,
      list: result.list,
      listid: listid,
      host: process.env.HOST || 'http://localhost:3000'
    })

    return result
  },
  removeUser: async function (payload) {
    const users = payload.users
    const listid = payload.listid
    const result = await listService.updateList(listid, users)
    if (!result) throw new Error('Something bad happened at updateList')

    return result
  },
  confirmUser: async function (payload) {
    const user = payload.listUser
    const listid = payload.listid
    const result = await listService.updateListAt(listid, user)
    if (!result) throw new Error('Something bad happened at updateList')

    return result
  }
}
