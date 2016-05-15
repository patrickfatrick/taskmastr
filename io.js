'use strict'

const chalk = require('chalk')
const IO = require('koa-socket')
const io = new IO({
  port: 80
})
const users = require('./routes/users')
const lists = require('./routes/lists')
const items = require('./routes/items')

function logIt (up, event, info, err) {
  console.log(`${chalk.magenta('[socket]')} ${(up) ? chalk.gray('<--') : chalk.gray('-->')} ${chalk.bold(event)} ${chalk.gray(info)} ${(err) ? chalk.red(err) : ''} ${chalk.cyan(new Date().toISOString())}`)
}

io.on('connection', (ctx, id) => {
  logIt(true, ctx.event, id)
})

io.on('disconnect', (ctx, id) => {
  logIt(false, ctx.event, id)
})

io.on('join', (ctx, payload) => {
  logIt(true, ctx.event, payload)
  ctx.socket.socket.join(payload)
})

io.on('leave', (ctx, payload) => {
  logIt(false, ctx.event, payload)
  ctx.socket.socket.leave(payload)
})

io.on('update-user', (ctx, payload) => {
  logIt(true, ctx.event, '/users/' + payload.username)
  try {
    return users.update(payload)
    .then((result) => {
      logIt(false, ctx.event, '/users/' + payload.username)
      ctx.socket.socket.to(payload.username).broadcast.emit('updated', result)
      ctx.acknowledge(null, result)
    })
  } catch (err) {
    logIt(false, ctx.event, '/users/' + payload.username, err)
    ctx.acknowledge(err, null)
  }
})

io.on('create-list', (ctx, payload) => {
  logIt(true, ctx.event, '/lists/' + payload.list.id)
  try {
    return lists.create(payload)
    .then((results) => {
      logIt(false, ctx.event, '/lists/' + payload.list.id)
      ctx.socket.socket.to(payload.listid).broadcast.emit('change', results[0])
      ctx.socket.socket.to(payload.user.username).broadcast.emit('updated', results[1])
      ctx.acknowledge(null, results[0])
    })
  } catch (err) {
    logIt(false, ctx.event, '/lists/' + payload.list.id, err)
    ctx.acknowledge(err, null)
  }
})

io.on('update-list', (ctx, payload) => {
  logIt(true, ctx.event, '/lists/' + payload.listid)
  try {
    return lists.update(payload)
    .then((results) => {
      logIt(false, ctx.event, '/lists/' + payload.listid)
      ctx.socket.socket.to(payload.listid).broadcast.emit('change', results[0])
      ctx.socket.socket.to(payload.user.username).broadcast.emit('updated', results[1])
      ctx.acknowledge(null, results[0])
    })
  } catch (err) {
    logIt(false, ctx.event, '/lists/' + payload.listid, err)
    console.log(`${chalk.magenta('[socket]')} ${chalk.red('ERROR')} POST ${chalk.gray('/lists/' + payload.listid)} ${chalk.red(err)} ${chalk.cyan(new Date().toISOString())}`)
    ctx.acknowledge(err, null)
  }
})

io.on('delete-list', (ctx, payload) => {
  logIt(true, ctx.event, '/lists/' + payload.listid)
  try {
    return lists.delete(payload)
    .then((results) => {
      logIt(false, ctx.event, '/lists/' + payload.listid)
      ctx.socket.socket.broadcast.emit('list-deleted', { listid: payload.listid, username: results[1].username, permanent: payload.permanent })
      ctx.acknowledge(null, results[0])
    })
  } catch (err) {
    logIt(false, ctx.event, '/lists/' + payload.listid, err)
    console.log(`${chalk.magenta('[socket]')} ${chalk.red('ERROR')} DELETE ${chalk.gray('/lists/' + payload.listid)} ${chalk.red(err)} ${chalk.cyan(new Date().toISOString())}`)
    ctx.acknowledge(err, null)
  }
})

io.on('delete-item', (ctx, payload) => {
  logIt(true, ctx.event, '/lists/' + payload.listid + '/items/' + payload.itemid)
  try {
    return items.delete(payload)
    .then((result) => {
      logIt(false, ctx.event, '/lists/' + payload.listid + '/items/' + payload.itemid)
      ctx.socket.socket.to(payload.listid).broadcast.emit('change', result)
      ctx.acknowledge(null, result)
    })
  } catch (err) {
    logIt(false, ctx.event, '/lists/' + payload.listid + '/items/' + payload.itemid, err)
    ctx.acknowledge(err, null)
  }
})

io.on('update-item', (ctx, payload) => {
  logIt(true, ctx.event, '/lists/' + payload.listid + '/items/' + payload.itemid)
  try {
    return items.update(payload)
    .then((result) => {
      logIt(false, ctx.event, '/lists/' + payload.listid + '/items/' + payload.itemid)
      ctx.socket.socket.to(payload.listid).broadcast.emit('change', result)
      ctx.acknowledge(null, result)
    })
  } catch (err) {
    logIt(false, ctx.event, '/lists/' + payload.listid + '/items/' + payload.itemid, err)
    ctx.acknowledge(err, null)
  }
})

io.on('create-item', (ctx, payload) => {
  logIt(true, ctx.event, '/lists/' + payload.listid + '/items/' + payload.item.id)
  try {
    return items.create(payload)
    .then((result) => {
      logIt(false, ctx.event, '/lists/' + payload.listid + '/items/' + payload.item.id)
      ctx.socket.socket.to(payload.listid).broadcast.emit('change', result)
      ctx.acknowledge(null, result)
    })
  } catch (err) {
    logIt(false, ctx.event, '/lists/' + payload.listid + '/items/' + payload.item.id, err)
    ctx.acknowledge(err, null)
  }
})

io.on('invite-user', (ctx, payload) => {
  logIt(true, ctx.event, '/lists/' + payload.listid + '/invite-user')
  try {
    return lists.invite(payload)
    .then((result) => {
      logIt(false, ctx.event, '/lists/' + payload.listid + '/invite-user')
      ctx.socket.socket.broadcast.emit('users-change', { list: result })
      ctx.acknowledge(null, result)
    })
  } catch (err) {
    logIt(false, ctx.event, '/lists/' + payload.listid + '/invite-user', err)
    ctx.acknowledge(err, null)
  }
})

io.on('remove-user', (ctx, payload) => {
  logIt(true, ctx.event, '/lists/' + payload.listid + '/remove-user/')
  try {
    return lists.removeUser(payload)
    .then((result) => {
      logIt(false, ctx.event, '/lists/' + payload.listid + '/remove-user/')
      ctx.socket.socket.broadcast.emit('users-change', { list: result, removed: true })
      ctx.acknowledge(null, result)
    })
  } catch (err) {
    logIt(false, ctx.event, '/lists/' + payload.listid + '/remove-user/', err)
    ctx.acknowledge(err, null)
  }
})

io.on('confirm-user', (ctx, payload) => {
  logIt(true, ctx.event, '/lists/' + payload.listid + '/confirm-user/')
  try {
    return lists.confirmUser(payload)
    .then((result) => {
      logIt(false, ctx.event, '/lists/' + payload.listid + '/confirm-user/')
      ctx.socket.socket.broadcast.emit('users-change', { list: result })
      ctx.acknowledge(null, result)
    })
  } catch (err) {
    logIt(false, ctx.event, '/lists/' + payload.listid + '/confirm-user/', err)
    ctx.acknowledge(err, null)
  }
})

module.exports = io
