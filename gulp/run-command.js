var { exec } = require('child_process')

module.exports = function (command) {
  exec(command, function (err, stdout, stderr) {
    console.log(stdout)
    console.log(stderr)
    if (err !== null) {
      console.log('exec error: ' + err)
    }
  })
}
