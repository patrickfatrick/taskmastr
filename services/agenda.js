var config = require('../config');
var Agenda = require('agenda');
var agenda = new Agenda(config.agendaOptions);

agenda.define('Agenda running', function (job, done) {
	var data = job.attrs.data;
	console.log('Agenda running at ' + data.time);
	done();
});

agenda.cancel({name: 'Agenda running'}, function (err, numRemoved) {
	if (err) return console.log(err);
	console.log('Agendas removed: ' + numRemoved);
	agenda.jobs({nextRunAt: {$exists: true, $nin: [null]}}, function (err, jobs) {
		if (err) return console.log(err);
		//console.log(jobs);
		jobs.forEach(function(job, i) {
			job.schedule(job.attrs.nextRunAt);
			console.log('Agenda rescheduled: ' + job.attrs.name + ' for ' + job.attrs.nextRunAt);
			job.save();
		})
	});
	agenda.now('Agenda running', {time: new Date()});
});

module.exports = agenda;