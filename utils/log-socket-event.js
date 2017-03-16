const chalk = require('chalk')

exports.logSocketEvent = function (up, event, { info, err, params }) {
  const base = chalk.magenta('[socket]')
  const eventLog = chalk.bold(event)
  const infoLog = chalk.gray(info)
  const direction = (up) ? chalk.gray('<--') : chalk.gray('-->')
  const errorLog = (err) ? chalk.red(err) : ''
  const dateLog = chalk.cyan(new Date().toISOString())
  const paramsLog = (params) ? '-- PARAMS: ' + JSON.stringify(params) : ''
  console.log(`${base} ${direction} ${eventLog} ${infoLog} ${errorLog} ${dateLog} ${paramsLog}`)
}