'use strict'

const io = require('socket.io')()
const slogger = require('slogged')
const sloggerConfig = require('./config').slogger
const users = require('./routes/users')
const lists = require('./routes/lists')
const items = require('./routes/items')

io.use(slogger(sloggerConfig))

io.on('connection', (socket) => {
  socket.on('join', (payload) => {
    socket.join(payload)
  })

  socket.on('leave', (payload) => {
    socket.leave(payload)
  })

  socket.on('update-user', (payload, ack) => {
    return users.update(payload)
      .then((result) => {
        socket.to(payload.username).broadcast.emit('updated', result)
        ack(null, result)
      })
      .catch((err) => {
        ack(err, null)
      })
  })

  socket.on('create-list', (payload, ack) => {
    return lists.create(payload)
      .then(({ listResult, userResult }) => {
        socket.to(payload.listid).broadcast.emit('change', listResult)
        socket.to(payload.user.username).broadcast.emit('updated', userResult)

        ack(null, listResult)
      })
      .catch((err) => {
        ack(err, null)
      })
  })

  socket.on('update-list', (payload, ack) => {
    return lists.update(payload)
      .then(({ listResult, userResult }) => {
        socket.to(payload.listid).broadcast.emit('change', listResult)
        socket.to(payload.user.username).broadcast.emit('updated', userResult)
        ack(null, listResult)
      })
      .catch((err) => {
        ack(err, null)
      })
  })

  socket.on('delete-list', (payload, ack) => {
    return lists.delete(payload)
      .then(({ listResult, userResult }) => {
        const emitData = {
          listid: payload.listid,
          username: userResult.username,
          permanent: payload.permanent
        }
        socket.broadcast.emit('list-deleted', emitData)
        ack(null, listResult)
      })
      .catch((err) => {
        ack(err, null)
      })
  })

  socket.on('delete-item', (payload, ack) => {
    return items.delete(payload)
      .then((result) => {
        socket.to(payload.listid).broadcast.emit('change', result)
        ack(null, result)
      })
      .catch((err) => {
        ack(err, null)
      })
  })

  socket.on('delete-items', (payload, ack) => {
    return items.deleteItems(payload)
      .then((result) => {
        socket.to(payload.listid).broadcast.emit('change', result)
        ack(null, result)
      })
      .catch((err) => {
        ack(err, null)
      })
  })

  socket.on('update-item', (payload, ack) => {
    return items.update(payload)
      .then((result) => {
        socket.to(payload.listid).broadcast.emit('change', result)
        ack(null, result)
      })
      .catch((err) => {
        ack(err, null)
      })
  })

  socket.on('create-item', (payload, ack) => {
    return items.create(payload)
      .then((result) => {
        socket.to(payload.listid).broadcast.emit('change', result)
        ack(null, result)
      })
      .catch((err) => {
        ack(err, null)
      })
  })

  socket.on('invite-user', (payload, ack) => {
    return lists.invite(payload)
      .then((result) => {
        const emitData = { list: result }

        socket.broadcast.emit('users-change', emitData)
        ack(null, result)
      })
      .catch((err) => {
        ack(err, null)
      })
  })

  socket.on('remove-user', (payload, ack) => {
    return lists.removeUser(payload)
      .then((result) => {
        const emitData = { list: result, removed: true }

        socket.broadcast.emit('users-change', emitData)
        ack(null, result)
      })
      .catch((err) => {
        ack(err, null)
      })
  })

  socket.on('confirm-user', (payload, ack) => {
    return lists.confirmUser(payload)
      .then((result) => {
        const emitData = { list: result }

        socket.broadcast.emit('users-change', emitData)
        ack(null, result)
      })
      .catch((err) => {
        ack(err, null)
      })
  })
})

module.exports = io
