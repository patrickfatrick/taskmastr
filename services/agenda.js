var async = require('async');
var config = require('../config');
var emailService = require('./email-service');
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
	agenda.now('Agenda running', {time: new Date()});
});

agenda.jobs({nextRunAt: {$exists: true, $nin: [null]}}, function (err, jobs) {
	if (err) return console.log(err);
	//console.log(jobs);
	async.each(jobs, function(job, callback) {
		//console.log(job)...;
		agenda.cancel({name: job.attrs.name}, function (err, numRemoved) {
			console.log('Agenda removed => ' + job.attrs.name);
			agenda.define(job.attrs.name, function (job, done) {
				var data = job.attrs.data;
				emailService.notificationEmail(data.username, data.item, data.host, data.date, function (err, next) {
					if (err) return next(err);
					console.log('Notification sent...');
					done();
				});
			});
			agenda.schedule(job.attrs.nextRunAt, job.attrs.name, {
				username: job.attrs.data.username,
				item: job.attrs.data.item,
				host: job.attrs.data.host,
				date: job.attrs.data.date
			});
			console.log('Agenda recreated => ' + job.attrs.name);
		/*job.schedule(job.attrs.nextRunAt);
		console.log('Agenda rescheduled: ' + job.attrs.name + ' for ' + job.attrs.nextRunAt);
		job.save();*/
		}, function (err) {
			if (err) return console.log(err);
			console.log('All agendas recreated successfully');
		});
	});
});

module.exports = agenda;