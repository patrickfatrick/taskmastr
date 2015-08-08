## taskmastr
Yet another todo list web app built with the MEAN stack (not mean.io or mean.js, though...). You can find a hosted version of this at [taskmastr.co](http://www.taskmastr.co)

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

##New in v4.1.0
We now have a pathway for resetting user passwords. Put in your email, check "Forgot your password?" and submit the form to receive a link that will allow you to create a new password.

Also changed up the animations for more bounciness.

##New in v4.0.0
Lists! You can now maintain multiple lists in taskmastr, with all the fixins included: Deleting, reordering, renaming.

We also store the list that's currently being viewed so if you switch lists and save, when you come back you'll be looking at the same list.

We also added more keyboard shortcuts to control the Lists menu, and also to control Night Mode.

Last and probably least, we said "No." to the mobile button next to each task that was designed to better use space on small devices. The experience just wasn't quite there, and the space saved didn't justify the extra clicks.

_features:_
- Username/Password authentication.
- Email notifications when assigning a task a due date.
- Remember me to store your session for up to 30 days.
- Delete, reorder, and rename tasks or lists.
- 5-second undo when deleting a task or list.
- Night mode for those of us who work when we should be sleeping.
- Bright mode for those of us who are afraid of the dark.
- Now with COOL animations! More fun guaranteed!
- Keyboard shortcuts allow you to control several aspects of the site.
- Mobile-friendly.

_Tasks for the future:_
- Drag and drop a task onto a list to move it.
- Swipe the list menu out on mobile.
- Revisit for bugs always.

_screenshots:_
![taskmastr](https://raw.githubusercontent.com/patrickfatrick/taskmastr/lists/screenshot.png)
![taskmastr list](https://raw.githubusercontent.com/patrickfatrick/taskmastr/lists/screenshot2.png)
![taskmastr modal](https://raw.githubusercontent.com/patrickfatrick/taskmastr/lists/screenshot3.png)
![taskmastr mobile](https://raw.githubusercontent.com/patrickfatrick/taskmastr/lists/screenshot4.png)

