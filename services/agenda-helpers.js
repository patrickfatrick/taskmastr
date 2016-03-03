var async = require('async')
var agenda = require('./agenda-service')

// Remove agenda schedules for deleted tasks
exports.deleteAgendas = function (user, deleteAgendas) {
  return new Promise(function (resolve, reject) {
    async.each(deleteAgendas, function (id, callback) {
      agenda.cancel({
        'data.agendaID': id
      }, function (err) {
        if (err) throw err
        console.log(user.username + ' => Agenda removed: ' + id)
        callback()
      })
    }, function (err) {
      if (err) reject(err)
      console.log('All deleted agendas removed successfully')
      resolve({success: true})
    })
  })
}

// Cancel current agendas and make new ones
exports.remakeAgendas = function (user, origin) {
  return new Promise(function (resolve, reject) {
    async.each(user.tasks, function (task, callback) {
      async.each(task.items, function (item) {
        agenda.cancel({
          'data.agendaID': item.id
        }, function (err) {
          if (err) throw err
          if (item.dueDate) {
            item.dueDate = new Date(item.dueDate)
            if (item.dueDate <= Date.now()) return true
            console.log(user.username + ' => Agenda scheduled: ' + item.id + ' ' + item.dueDate)
            agenda.schedule(item.dueDate, 'Notification Email', {
              agendaID: item.id,
              username: user.username,
              item: item.item,
              host: origin,
              date: item.dueDate
            })
          }
        })
      }, callback())
    }, function (err) {
      if (err) reject(err)
      console.log('All agendas scheduled (or rescheduled).')
      resolve({success: true})
    })
  })
}
