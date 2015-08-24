#taskmastr
Yet another task management web app built with Node.js, Express, MongoDB, and Angular. You can find a hosted version of this at [taskmastr.co](http://www.taskmastr.co)

While taskmastr definitely does fall under the category of "projects intended to learn stuff with", it's also a pretty decent web-based task manager at this point.

Please see [the wiki](https://bitbucket.org/patrickfatrick/taskmastr/wiki/Home) for information on how to use taskmastr.

#Features
taskmastr is...

- Fast  
- Intuitive  
- Unintrusive  
- Mobile-friendly  
- Fun  

taskmastr has...

- Username/Password authentication.  
- Email notifications when assigning a task a due date.  
- Session storage for up to 30 days (useful for phone usage).  
- Delete, reorder, and rename tasks or lists.  
- 5-second undo when deleting a task or list.  
- Night mode for those of us who work when we should be sleeping.  
- Bright mode for those of us who are afraid of the dark.  
- Now with COOL animations! More fun guaranteed!  
- Keyboard shortcuts allow you to control basically everything.  

taskmastr is updated regularly with new features

#Changelog
##New in v5.2.0
The entire app can now be controlled with the keyboard. See [this page](https://github.com/patrickfatrick/taskmastr/wiki/Keyboard-shortcuts) for details.

This entails a pretty big shift in functionality. In the same way that lists have behaved where one is active at any given moment, now individual tasks can also be active. The active task is highlighted in green, and you can select the next or previous task in the list using the up and down arrow keys. Once a task is selected you can do all the usual stuff to it using the keyboard: complete it, rename it, move it, set a due date, and delete it.

##New in v5.1.0
Notification scheduling _actually_ works! Hooray!

We've also added in the ability to shortcut your due date when creating the task itself.

Try:

- `Remind me to wash the dishes tomorrow` 'Remind me to' signals taskmastr to look out for a date.  
- `/r Meet with that person I know on 9/15/2015` So does '/r'.  
- `/r Do that thing I said I'd do on oct 10` You can use an actual date or something a little easier to type.  
- `/r Eat food and sleep next Tuesday` You can also use relative dates.  
- `/y come up with a New Year's Resolution` '/y' sets the date to January 1st of next year.  
- `/t Wake up at some point` '/t' sets the date to tomorrow.  
- `/w Go to work` '/w' sets the date to next Monday.  
- `/m pay rent` '/m' sets the date to the 1st of next month.  

This feature really does not and should not work for every single imaginable date format so it's up to you to stay sensible about it. It also does not work for dates in the past. Use the datepicker for that. And while we're on the subject of the datepicker, while you can set up a date in the past you will of course not receive any notification for it. The idea here is really more for allowing you to see when the task was due, after the fact.

_One more note about shortcuts:_ If today is Saturday, putting in 'next saturday' will not work, use 'next week' when you mean one week from today. Same goes for 'next month' for one month from today, and 'next year' for... well, you know.

##New in v5.0.0
Notifications! Use the new datepicker next to each task to assign a due date, and we'll send you a handy reminder at 6am the day of.

#Screenshots
![taskmastr basic usage](./images/taskmastr-basic-usage-1.png)
![taskmastr basic usage 2a](./images/taskmastr-basic-usage-2a.png)
![taskmastr basic usage 3](./images/taskmastr-basic-usage-3.png)
![taskmastr basic usage 4](./images/taskmastr-basic-usage-4.png)
![taskmastr modal](./images/screenshot3.png)
![taskmastr mobile](./images/screenshot4.png)

