var config = require('../config');
var Agenda = require('agenda');
var agenda = new Agenda(config.agendaOptions);

module.exports = agenda;