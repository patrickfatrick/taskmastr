'use strict'

const config = require('../config')
const Agenda = require('agenda')
const agenda = new Agenda(config.agendaOptions)
const nodemailer = require('nodemailer')
const sgTransport = require('nodemailer-sendgrid-transport')

agenda.define('Agenda running', (job, done) => {
  console.log('Agenda running at ' + new Date())
  done()
})

agenda.define('Welcome Email', (job, done) => {
  const data = job.attrs.data
  const options = {
    auth: {
      api_key: process.env.SENDGRID_API_KEY
    }
  }
  const mailer = nodemailer.createTransport(sgTransport(options))
  const email = {
    to: data.username,
    from: 'taskmastr <do-not-reply@taskmastr.co>',
    subject: 'Greetings from taskmastr',
    text: 'Thanks for using taskmastr!\n\n' + 'We really hope you enjoy using it as much as we\'ve enjoyed making it. Here\'s a link to it in case you ever forget.\n\n' + data.host + '\n\n' + '\n\n' + 'If you ever have any questions please contact Patrick directly at patrick@taskmastr.co or tap him on the shoulder.\n\n' + 'Sincerely,\n\ntaskmastr\n\nP.S. Don\'t forget to check out the taskmastr wiki if you have\'nt already! https://patrickfatrick.gitbooks.io/taskmastr/content/\n'
  }
  mailer.sendMail(email, (err) => {
    if (err) return done(err)
    console.log(data.username + ' => Welcome email sent')
    done()
  })
})

agenda.define('Reset Email', (job, done) => {
  const data = job.attrs.data
  const options = {
    auth: {
      api_key: process.env.SENDGRID_API_KEY
    }
  }
  const mailer = nodemailer.createTransport(sgTransport(options))
  const email = {
    to: data.username,
    from: 'taskmastr <do-not-reply@taskmastr.co>',
    subject: 'taskmastr Password Reset',
    text: 'Hi there,\n\n' + 'You\'ve received this email because you or someone else requested to reset the password for your account.\n\n' + 'Please click on the following link to create a new password:\n\n' + data.host + '/#/reset?token=' + data.resetToken + '\n\n' + 'If you did not request this, please ignore this email and your password will remain unchanged. This link becomes invalid once you reset your password, or after one hour whichever comes first.\n\n' + 'Sincerely,\n\ntaskmastr\n'
  }
  mailer.sendMail(email, (err) => {
    if (err) return done(err)
    console.log(data.username + ' => Password reset email sent')
    done()
  })
})

agenda.define('Notification Email', function (job, done) {
  const data = job.attrs.data
  const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  let dateStr = data.date.getDate()
  switch (data.date.getDate()) {
    case 1:
    case 21:
    case 31:
      dateStr += 'st'
      break
    case 2:
    case 22:
      dateStr += 'nd'
      break
    case 3:
    case 23:
      dateStr += 'rd'
      break
    default:
      dateStr += 'th'
  }
  const options = {
    auth: {
      api_key: process.env.SENDGRID_API_KEY
    }
  }
  const mailer = nodemailer.createTransport(sgTransport(options))
  const email = {
    to: data.username,
    from: 'taskmastr <do-not-reply@taskmastr.co>',
    subject: 'taskmastr Notification: "' + data.item + '"',
    text: 'Good morning!\n\n' + 'It is currently the morning of ' + monthArr[data.date.getMonth()] + ' ' + dateStr + ', and we just wanted to let you know that you have a task due today:\n\n "' + data.item + '"\n\n' + 'If you\'d like to check out your tasks please click this link! ' + data.host + '\n\n' + 'Sincerely,\n\ntaskmastr\n'
  }
  mailer.sendMail(email, function (err) {
    if (err) return done(err)
    console.log(`${data.username} => Notification sent => ${data.agendaID}`)
    done()
  })
})

agenda.define('List Invite Email', (job, done) => {
  const data = job.attrs.data

  const options = {
    auth: {
      api_key: process.env.SENDGRID_API_KEY
    }
  }
  const mailer = nodemailer.createTransport(sgTransport(options))
  const email = {
    to: data.username,
    from: 'taskmastr <do-not-reply@taskmastr.co>',
    subject: `taskmastr List Invitation: "${data.list}"`,
    text: `Hello!\n\nYou're receiving this email because you were invited to a taskmastr list called "${data.list}" by ${data.owner}.\n\nYou can ignore this invitation by simply discarding this email. If you'd like to join this list just click on the following link: ${data.host}/#/app/list/${data.listid}?newuser=${data.username}\n\nIf you're already a taskmastr user you may need to sign in, and if you are not already a user you can join through that link as well.\n\nSincerely,\n\ntaskmastr\n`
  }
  mailer.sendMail(email, function (err) {
    if (err) return done(err)
    console.log(`${data.username} => List Invite Email sent => ${data.listid}`)
    done()
  })
})

agenda.on('fail', function (err, job) {
  console.log('Agenda email job failed with error: %s', err.message)
})

module.exports = agenda
