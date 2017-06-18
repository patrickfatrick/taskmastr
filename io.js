'use strict'

const io = require('socket.io')()
const users = require('./routes/users')
const lists = require('./routes/lists')
const items = require('./routes/items')
const socketLogger = require('./utils/socket-logger')
const logSocketUp = socketLogger.logSocketUp
const logSocketDown = socketLogger.logSocketDown
const logSocketError = socketLogger.logSocketError

io.on('connection', (socket) => {
  logSocketUp('connection', socket.id)

  socket.on('disconnect', () => {
    logSocketDown('disconnect', socket.id)
  })

  socket.on('join', (payload) => {
    logSocketUp('join', payload)
    socket.join(payload)
  })

  socket.on('leave', (payload) => {
    logSocketDown('leave', payload, payload)
    socket.leave(payload)
  })

  socket.on('update-user', (payload, ack) => {
    const socketEvent = 'update-user'
    const socketRoute = '/users/' + payload.username
    const startTime = Date.now()
    logSocketUp(socketEvent, socketRoute, payload)

    return users.update(payload)
    .then((result) => {
      logSocketDown(socketEvent, socketRoute, Date.now() - startTime, result)
      socket.to(payload.username).broadcast.emit('updated', result)
      ack(null, result)
    })
    .catch((err) => {
      logSocketError(socketEvent, socketRoute, Date.now() - startTime, err)
      ack(err, null)
    })
  })

  socket.on('create-list', (payload, ack) => {
    const socketEvent = 'create-list'
    const socketRoute = '/lists'
    const startTime = Date.now()
    logSocketUp(socketEvent, socketRoute, payload)

    return lists.create(payload)
    .then(({ listResult, userResult }) => {
      logSocketDown(socketEvent, socketRoute, Date.now() - startTime, listResult)
      socket.to(payload.listid).broadcast.emit('change', listResult)
      socket.to(payload.user.username).broadcast.emit('updated', userResult)
      ack(null, listResult)
    })
    .catch((err) => {
      logSocketError(socketEvent, socketRoute, Date.now() - startTime, err)
      ack(err, null)
    })
  })

  socket.on('update-list', (payload, ack) => {
    const socketEvent = 'update-list'
    const socketRoute = '/lists/' + payload.listid
    const startTime = Date.now()
    logSocketUp(socketEvent, socketRoute, payload)

    return lists.update(payload)
    .then(({ listResult, userResult }) => {
      logSocketDown(socketEvent, socketRoute, Date.now() - startTime, listResult)
      socket.to(payload.listid).broadcast.emit('change', listResult)
      socket.to(payload.user.username).broadcast.emit('updated', userResult)
      ack(null, listResult)
    })
    .catch((err) => {
      logSocketError(socketEvent, socketRoute, Date.now() - startTime, err)
      ack(err, null)
    })
  })

  socket.on('delete-list', (payload, ack) => {
    const socketEvent = 'delete-list'
    const socketRoute = '/lists/' + payload.listid
    const startTime = Date.now()
    logSocketUp(socketEvent, socketRoute, payload)

    return lists.delete(payload)
    .then(({ listResult, userResult }) => {
      logSocketDown(socketEvent, socketRoute, Date.now() - startTime, socketRoute, listResult)
      socket.broadcast.emit('list-deleted', {
        listid: payload.listid,
        username: userResult.username,
        permanent: payload.permanent
      })
      ack(null, listResult)
    })
    .catch((err) => {
      logSocketError(socketEvent, socketRoute, Date.now() - startTime, err)
      ack(err, null)
    })
  })

  socket.on('delete-item', (payload, ack) => {
    const socketEvent = 'delete-item'
    const socketRoute = '/items/' + payload.itemid
    const startTime = Date.now()
    logSocketUp(socketEvent, socketRoute, payload)

    return items.delete(payload)
    .then((result) => {
      logSocketDown(socketEvent, socketRoute, Date.now() - startTime, result)
      socket.to(payload.listid).broadcast.emit('change', result)
      ack(null, result)
    })
    .catch((err) => {
      logSocketError(socketEvent, socketRoute, Date.now() - startTime, err)
      ack(err, null)
    })
  })

  socket.on('update-item', (payload, ack) => {
    const socketEvent = 'update-item'
    const socketRoute = '/items/' + payload.itemid
    const startTime = Date.now()
    logSocketUp(socketEvent, socketRoute, payload)

    return items.update(payload)
    .then((result) => {
      logSocketDown(socketEvent, socketRoute, Date.now() - startTime, result)
      socket.to(payload.listid).broadcast.emit('change', result)
      ack(null, result)
    })
    .catch((err) => {
      logSocketError(socketEvent, socketRoute, Date.now() - startTime, err)
      ack(err, null)
    })
  })

  socket.on('create-item', (payload, ack) => {
    const socketEvent = 'create-item'
    const socketRoute = '/items'
    const startTime = Date.now()
    logSocketUp(socketEvent, socketRoute, payload)

    return items.create(payload)
    .then((result) => {
      logSocketDown(socketEvent, socketRoute, Date.now() - startTime, result)
      socket.to(payload.listid).broadcast.emit('change', result)
      ack(null, result)
    })
    .catch((err) => {
      logSocketError(socketEvent, socketRoute, Date.now() - startTime, err)
      ack(err, null)
    })
  })

  socket.on('invite-user', (payload, ack) => {
    const socketEvent = 'invite-user'
    const socketRoute = '/lists/' + payload.listid + '/invite-user'
    const startTime = Date.now()
    logSocketUp(socketEvent, socketRoute, payload)

    return lists.invite(payload)
    .then((result) => {
      logSocketDown(socketEvent, socketRoute, Date.now() - startTime, result)
      socket.broadcast.emit('users-change', { list: result })
      ack(null, result)
    })
    .catch((err) => {
      logSocketError(socketEvent, socketRoute, Date.now() - startTime, err)
      ack(err, null)
    })
  })

  socket.on('remove-user', (payload, ack) => {
    const socketEvent = 'remove-user'
    const socketRoute = '/lists/' + payload.listid + '/remove-user'
    const startTime = Date.now()
    logSocketUp(socketEvent, socketRoute, payload)

    return lists.removeUser(payload)
    .then((result) => {
      logSocketDown(socketEvent, socketRoute, Date.now() - startTime, result)
      socket.broadcast.emit('users-change', { list: result, removed: true })
      ack(null, result)
    })
    .catch((err) => {
      logSocketError(socketEvent, socketRoute, Date.now() - startTime, err)
      ack(err, null)
    })
  })

  socket.on('confirm-user', (payload, ack) => {
    const socketEvent = 'confirm-user'
    const socketRoute = '/lists/' + payload.listid + '/confirm-user'
    const startTime = Date.now()
    logSocketUp(socketEvent, socketRoute, payload)

    return lists.confirmUser(payload)
    .then((result) => {
      logSocketDown(socketEvent, socketRoute, Date.now() - startTime, result)
      socket.broadcast.emit('users-change', { list: result })
      ack(null, result)
    })
    .catch((err) => {
      logSocketError(socketEvent, socketRoute, Date.now() - startTime, err)
      ack(err, null)
    })
  })
})

module.exports = io
