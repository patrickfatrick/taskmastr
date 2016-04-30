'use strict'

const chalk = require('chalk')
const IO = require('koa-socket')
const io = new IO({
  port: 80
})
const users = require('./routes/users')
const lists = require('./routes/lists')
const items = require('./routes/items')

io.on('connection', (ctx, id) => {
  console.log(`${chalk.magenta('[socket]')} ${chalk.gray('<--')} Client connected ${chalk.gray(id)}`)
})

io.on('disconnect', (ctx) => {
  console.log(`${chalk.magenta('[socket]')} ${chalk.gray('-->')} Client disconnected ${chalk.gray(ctx.socket.socket.id)}`)
})

io.on('join', (ctx, payload) => {
  console.log(`${chalk.magenta('[socket]')} ${chalk.gray('<--')} Client joined ${chalk.gray(payload)}`)
  ctx.socket.socket.join(payload)
})

io.on('leave', (ctx, payload) => {
  console.log(`${chalk.magenta('[socket]')} ${chalk.gray('-->')} Client left ${chalk.gray(payload)}`)
  ctx.socket.socket.leave(payload)
})

io.on('update-user', (ctx, payload) => {
  console.log(`${chalk.magenta('[socket]')} ${chalk.gray('<--')} POST ${chalk.gray('/users/' + payload.username)} ${chalk.cyan(new Date().toISOString())}`)
  try {
    return users.update(payload)
    .then((result) => {
      console.log(`${chalk.magenta('[socket]')} ${chalk.gray('-->')} POST ${chalk.gray('/users/' + payload.username)} ${chalk.cyan(new Date().toISOString())}`)
      ctx.socket.socket.to(payload.username).broadcast.emit('updated', result)
      ctx.acknowledge(null, result)
    })
  } catch (err) {
    console.log(`${chalk.magenta('[socket]')} ${chalk.red('ERROR')} POST ${chalk.gray('/users/' + payload.username)} ${chalk.red(err)} ${chalk.cyan(new Date().toISOString())}`)
    ctx.acknowledge(err, null)
  }
})

io.on('create-list', (ctx, payload) => {
  console.log(`${chalk.magenta('[socket]')} ${chalk.gray('<--')} PUT ${chalk.gray('/lists/' + payload.list.id)} ${chalk.cyan(new Date().toISOString())}`)
  try {
    return lists.create(payload)
    .then((results) => {
      console.log(`${chalk.magenta('[socket]')} ${chalk.gray('-->')} PUT ${chalk.gray('/lists/' + payload.list.id)} ${chalk.cyan(new Date().toISOString())}`)
      ctx.socket.socket.to(payload.listid).broadcast.emit('change', results[0])
      ctx.socket.socket.to(payload.user.username).broadcast.emit('updated', results[1])
      ctx.acknowledge(null, results[0])
    })
  } catch (err) {
    console.log(`${chalk.magenta('[socket]')} ${chalk.red('ERROR')} PUT ${chalk.gray('/lists/' + payload.list.id)} ${chalk.red(err)} ${chalk.cyan(new Date().toISOString())}`)
    ctx.acknowledge(err, null)
  }
})

io.on('update-list', (ctx, payload) => {
  console.log(`${chalk.magenta('[socket]')} ${chalk.gray('<--')} POST ${chalk.gray('/lists/' + payload.listid)} ${chalk.cyan(new Date().toISOString())}`)
  try {
    return lists.update(payload)
    .then((results) => {
      console.log(`${chalk.magenta('[socket]')} ${chalk.gray('-->')} POST ${chalk.gray('/lists/' + payload.listid)} ${chalk.cyan(new Date().toISOString())}`)
      ctx.socket.socket.to(payload.listid).broadcast.emit('change', results[0])
      ctx.socket.socket.to(payload.user.username).broadcast.emit('updated', results[1])
      ctx.acknowledge(null, results[0])
    })
  } catch (err) {
    console.log(`${chalk.magenta('[socket]')} ${chalk.red('ERROR')} POST ${chalk.gray('/lists/' + payload.listid)} ${chalk.red(err)} ${chalk.cyan(new Date().toISOString())}`)
    ctx.acknowledge(err, null)
  }
})

io.on('delete-list', (ctx, payload) => {
  console.log(`${chalk.magenta('[socket]')} ${chalk.gray('<--')} DELETE ${chalk.gray('/lists/' + payload.listid)} ${chalk.cyan(new Date().toISOString())}`)
  try {
    return lists.delete(payload)
    .then((results) => {
      console.log(`${chalk.magenta('[socket]')} ${chalk.gray('-->')} DELETE ${chalk.gray('/lists/' + payload.listid)} ${chalk.cyan(new Date().toISOString())}`)
      ctx.socket.socket.to(payload.listid).broadcast.emit('deleted', results[1])
      ctx.socket.socket.to(payload.user.username).broadcast.emit('updated', results[1])
      ctx.acknowledge(null, results[0])
    })
  } catch (err) {
    console.log(`${chalk.magenta('[socket]')} ${chalk.red('ERROR')} DELETE ${chalk.gray('/lists/' + payload.listid)} ${chalk.red(err)} ${chalk.cyan(new Date().toISOString())}`)
    ctx.acknowledge(err, null)
  }
})

io.on('delete-item', (ctx, payload) => {
  console.log(`${chalk.magenta('[socket]')} ${chalk.gray('<--')} DELETE ${chalk.gray('/lists/' + payload.listid + '/items/' + payload.itemid)} ${chalk.cyan(new Date().toISOString())}`)
  try {
    return items.delete(payload)
    .then((result) => {
      console.log(`${chalk.magenta('[socket]')} ${chalk.gray('-->')} DELETE ${chalk.gray('/lists/' + payload.listid + '/items/' + payload.itemid)} ${chalk.cyan(new Date().toISOString())}`)
      ctx.socket.socket.to(payload.listid).broadcast.emit('change', result)
      ctx.acknowledge(null, result)
    })
  } catch (err) {
    console.log(`${chalk.magenta('[socket]')} ${chalk.red('ERROR')} DELETE ${chalk.gray('/lists/' + payload.listid + '/items/' + payload.itemid)} ${chalk.red(err)} ${chalk.cyan(new Date().toISOString())}`)
    ctx.acknowledge(err, null)
  }
})

io.on('update-item', (ctx, payload) => {
  console.log(`${chalk.magenta('[socket]')} ${chalk.gray('<--')} POST ${chalk.gray('/lists/' + payload.listid + '/items/' + payload.itemid)} ${chalk.cyan(new Date().toISOString())}`)
  try {
    return items.update(payload)
    .then((result) => {
      console.log(`${chalk.magenta('[socket]')} ${chalk.gray('-->')} POST ${chalk.gray('/lists/' + payload.listid + '/items/' + payload.itemid)} ${chalk.cyan(new Date().toISOString())}`)
      ctx.socket.socket.to(payload.listid).broadcast.emit('change', result)
      ctx.acknowledge(null, result)
    })
  } catch (err) {
    console.log(`${chalk.magenta('[socket]')} ${chalk.red('ERROR')} POST ${chalk.gray('/lists/' + payload.listid + '/items/' + payload.itemid)} ${chalk.red(err)} ${chalk.cyan(new Date().toISOString())}`)
    ctx.acknowledge(err, null)
  }
})

io.on('create-item', (ctx, payload) => {
  console.log(`${chalk.magenta('[socket]')} ${chalk.gray('<--')} PUT ${chalk.gray('/lists/' + payload.listid + '/items/' + payload.item.id)} ${chalk.cyan(new Date().toISOString())}`)
  try {
    return items.create(payload)
    .then((result) => {
      console.log(`${chalk.magenta('[socket]')} ${chalk.gray('-->')} PUT ${chalk.gray('/lists/' + payload.listid + '/items/' + payload.item.id)} ${chalk.cyan(new Date().toISOString())}`)
      ctx.socket.socket.to(payload.listid).broadcast.emit('change', result)
      ctx.acknowledge(null, result)
    })
  } catch (err) {
    console.log(`${chalk.magenta('[socket]')} ${chalk.red('ERROR')} PUT ${chalk.gray('/lists/' + payload.listid + '/items/' + payload.item.id)} ${chalk.red(err)} ${chalk.cyan(new Date().toISOString())}`)
    ctx.acknowledge(err, null)
  }
})

module.exports = io
