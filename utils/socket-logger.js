const chalk = require('chalk')

module.exports = {
  logSocketUp (socketEvent, socketRoute, payload) {
    console.log(
      chalk.magenta('[socket]'),
      chalk.gray('<--'),
      chalk.bold(socketEvent),
      chalk.gray(socketRoute),
      payload ? JSON.stringify(payload) : ''
    )
  },

  logSocketDown (socketEvent, socketRoute, time, ack) {
    console.log(
      chalk.magenta('[socket]'),
      chalk.gray('-->'),
      chalk.bold(socketEvent),
      chalk.gray(socketRoute),
      chalk.green('OK'),
      time ? chalk.gray(time + 'ms') : '',
      ack ? JSON.stringify(ack) : ''
    )
  },

  logSocketError (socketEvent, socketRoute, time, error) {
    console.log(
      chalk.magenta('[socket]'),
      chalk.bold(socketEvent),
      chalk.gray(socketRoute),
      chalk.red('ERR'),
      chalk.gray(time + 'ms'),
      chalk.red(error)
    )
  }
}
