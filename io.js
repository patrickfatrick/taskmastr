'use strict'

const io = require('socket.io')()
const users = require('./routes/users')
const lists = require('./routes/lists')
const items = require('./routes/items')
const logSocketEvent = require('./utils/log-socket-event')

io.on('connection', (socket) => {
  logSocketEvent(true, 'connection', { info: socket.id })

  socket.on('disconnect', () => {
    logSocketEvent(false, 'disconnect', { info: socket.id })
  })

  socket.on('join', (payload) => {
    logSocketEvent(true, 'join', { info: payload })
    socket.join(payload)
  })

  socket.on('leave', (payload) => {
    logSocketEvent(false, 'leave', { info: payload, params: payload })
    socket.leave(payload)
  })

  socket.on('update-user', (payload, ack) => {
    const event = 'update-user'
    logSocketEvent(true, event, { info: '/users/' + payload.username, params: payload })
    try {
      return users.update(payload)
      .then((result) => {
        logSocketEvent(false, event, { info: '/users/' + payload.username })
        socket.to(payload.username).broadcast.emit('updated', result)
        ack(null, result)
      })
    } catch (err) {
      logSocketEvent(false, event, { info: '/users/' + payload.username, err })
      ack(err, null)
    }
  })

  socket.on('create-list', (payload, ack) => {
    const event = 'create-list'
    logSocketEvent(true, event, { info: '/lists/' + payload.list._id, params: payload })
    try {
      return lists.create(payload)
      .then((results) => {
        logSocketEvent(false, event, { info: '/lists/' + payload.list._id })
        socket.to(payload.listid).broadcast.emit('change', results[0])
        socket.to(payload.user.username).broadcast.emit('updated', results[1])
        ack(null, results[0])
      })
    } catch (err) {
      logSocketEvent(false, event, { info: '/lists/' + payload.list._id, err })
      ack(err, null)
    }
  })

  socket.on('update-list', (payload, ack) => {
    const event = 'update-list'
    logSocketEvent(true, event, { info: '/lists/' + payload.listid, params: payload })
    try {
      return lists.update(payload)
      .then((results) => {
        logSocketEvent(false, event, { info: '/lists/' + payload.listid })
        socket.to(payload.listid).broadcast.emit('change', results[0])
        socket.to(payload.user.username).broadcast.emit('updated', results[1])
        ack(null, results[0])
      })
    } catch (err) {
      logSocketEvent(false, event, { info: '/lists/' + payload.listid, err })
      ack(err, null)
    }
  })

  socket.on('delete-list', (payload, ack) => {
    const event = 'delete-list'
    logSocketEvent(true, event, { info: '/lists/' + payload.listid, params: payload })
    try {
      return lists.delete(payload)
      .then((results) => {
        logSocketEvent(false, event, { info: '/lists/' + payload.listid })
        socket.broadcast.emit('list-deleted', {
          listid: payload.listid,
          username: results[1].username,
          permanent: payload.permanent
        })
        ack(null, results[0])
      })
    } catch (err) {
      logSocketEvent(false, event, { info: '/lists/' + payload.listid, err })
      ack(err, null)
    }
  })

  socket.on('delete-item', (payload, ack) => {
    const event = 'delete-item'
    logSocketEvent(true, event, {
      info: '/lists/' + payload.listid + '/items/' + payload.itemid,
      params: payload
    })
    try {
      return items.delete(payload)
      .then((result) => {
        logSocketEvent(false, event, { info: '/lists/' + payload.listid + '/items/' + payload.itemid })
        socket.to(payload.listid).broadcast.emit('change', result)
        ack(null, result)
      })
    } catch (err) {
      logSocketEvent(false, event, { info: '/lists/' + payload.listid + '/items/' + payload.itemid, err })
      ack(err, null)
    }
  })

  socket.on('update-item', (payload, ack) => {
    const event = 'update-item'
    logSocketEvent(true, event, {
      info: '/lists/' + payload.listid + '/items/' + payload.itemid,
      params: payload
    })
    try {
      return items.update(payload)
      .then((result) => {
        logSocketEvent(false, event, { info: '/lists/' + payload.listid + '/items/' + payload.itemid })
        socket.to(payload.listid).broadcast.emit('change', result)
        ack(null, result)
      })
    } catch (err) {
      logSocketEvent(false, event, { info: '/lists/' + payload.listid + '/items/' + payload.itemid, err })
      ack(err, null)
    }
  })

  socket.on('create-item', (payload, ack) => {
    const event = 'create-item'
    logSocketEvent(true, event, {
      info: '/lists/' + payload.listid + '/items/' + payload.item._id,
      params: payload
    })
    try {
      return items.create(payload)
      .then((result) => {
        logSocketEvent(false, event, { info: '/lists/' + payload.listid + '/items/' + payload.item._id })
        socket.to(payload.listid).broadcast.emit('change', result)
        ack(null, result)
      })
    } catch (err) {
      logSocketEvent(false, event, { info: '/lists/' + payload.listid + '/items/' + payload.item._id, err })
      ack(err, null)
    }
  })

  socket.on('invite-user', (payload, ack) => {
    const event = 'invite-user'
    logSocketEvent(true, event, { info: '/lists/' + payload.listid + '/invite-user', params: payload })
    try {
      return lists.invite(payload)
      .then((result) => {
        logSocketEvent(false, event, { info: '/lists/' + payload.listid + '/invite-user' })
        socket.broadcast.emit('users-change', { list: result })
        ack(null, result)
      })
    } catch (err) {
      logSocketEvent(false, event, { info: '/lists/' + payload.listid + '/invite-user', err })
      ack(err, null)
    }
  })

  socket.on('remove-user', (payload, ack) => {
    const event = 'remove-user'
    logSocketEvent(true, event, { info: '/lists/' + payload.listid + '/remove-user/', params: payload })
    try {
      return lists.removeUser(payload)
      .then((result) => {
        logSocketEvent(false, event, { info: '/lists/' + payload.listid + '/remove-user/' })
        socket.broadcast.emit('users-change', { list: result, removed: true })
        ack(null, result)
      })
    } catch (err) {
      logSocketEvent(false, event, { info: '/lists/' + payload.listid + '/remove-user/', err })
      ack(err, null)
    }
  })

  socket.on('confirm-user', (payload, ack) => {
    const event = 'confirm-user'
    logSocketEvent(true, event, { info: '/lists/' + payload.listid + '/confirm-user/', params: payload })
    try {
      return lists.confirmUser(payload)
      .then((result) => {
        logSocketEvent(false, event, { info: '/lists/' + payload.listid + '/confirm-user/' })
        socket.broadcast.emit('users-change', { list: result })
        ack(null, result)
      })
    } catch (err) {
      logSocketEvent(false, event, { info: '/lists/' + payload.listid + '/confirm-user/', err })
      ack(err, null)
    }
  })
})

module.exports = io
