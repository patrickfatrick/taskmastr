## New in 10.2

MArky marked is now incorporated into item notes. That means you can use markdown in your notes and they will display as lovely html in the details panel. Nice!

## New v10.0

I guess I forgot to update the readme for previous releases. Whoops. Well to summarize releases 8.0 and 9.0: 

8.0 was huge, introducing collaboration features and with that, sockets. You could, as a list owner, invite other users to your list, and once in both users could make changes to the items therein and immediately see the changes other users have made as they are making them. Only the list owner could change the collaborator list, or change the title of the list, or delete the list. This also encompassed migrating data to RethinkDB for most things (agenda notifications were the one table still persisted in Mongo). As it turned out I wasn't really using the cool streaming data features RethinkDB provides but either way ReQL has a nice syntax and it comes with a very nifty web management GUI. Fun stuff!

v9.0 was a relatively small change as far as what users would see. The only visible change was the introduction of a "Remove all complete items" button inspired by one of my friends's work list which has about 5000 complete items just chilling in it. Hit the button and all of those will go away, and it also comes with a five-second undo. v9.0 was more about upgrading the entire front-end to Vue2.0 (along with the corresponding vuex and vue-router upgrades), not a small undertaking.

Whew, with that out of the way, on to v10.0. This actually has 0 user-facing changes. Maybe some bug fixes, but that's it. The big change here was the re-migration BACK to Mongo. This isn't because I don't like RethinkDB or am concerned about its direction given the news that the company behind it is shutting down. This is entirely because of the fact I don't want to pay for a DigitalOcean droplet to host a RethinkDB database anymore. So now taskmastr is wholly *_free_* for me to host (thanks to the free plans at [Heroku](heroku.com) and [mLab](mlab.com)), which means there's no reason for me to ever take it offline. Some of the models have been rewritten in ways to work better with Mongoose, and for kicks I went ahead and made a new model and table for Items. So now my data has honestly become somewhat relational, so don't be surprised if I suddenly switch to Postgres. Just kidding, probably won't bother with that, ever.

10.0 also sees an upgrade to webpack 2.0 which is exciting, I guess?

## New in v7.0

Backend changes mostly, but the app now saves your changes as you go, no more need to save. There are also URLs for each list. If you have the link to a list, you can go straight to it now.

This essentially decoupled the list from the user. Lists are now saved in a separate table, and a user essentially subscribes to the list.

There will be plenty more work in this area, mainly in the sense that the next major release will focus on collaboration, multiple users being able to subscribe to a list. Stay tuned!

## New in v6.3

Switched from Express to Koa.

## New in v6.2

We now track date completed in addition to date created. If a task is complete and you check out the detailed view you will now see the date the task was completed on, instead of the usual due date information.

This also goes hand in hand with new functionality with completion: we now remove due dates when a task is completed. The only reason you'd want to keep it is to know when a task was completed, but since we now track that independently, no need for it! This has the added benefit of preventing the need to manually remove a due date when completing a task early so no email notification is sent. Nice!

## New in v6.1

Detailed views for tasks, this is now where due dates are set and removed, where tasks are renamed, and, NEW FEATURE, where you can set notes for each task. The calendar and rename toggles in the list have been replaced with a toggle for the detailed view.

## New in v6.0

The front-end has been completely rewritten in the ground up in [Vue](vuejs.org), from Angular 1.x. With that comes some small changes but mostly everything should be under the hood. 

## New in v5.3.0

Mostly aesthetic changes. Some are more noticeable than others, but the emphasis is making bright mode less abhorrent.

Some changes were also inspired by Google's Material Design and [Material UI](http://material-ui.com/#/home).

## New in v5.2.0

The entire app can now be controlled with the keyboard. See [this page](https://github.com/patrickfatrick/taskmastr/wiki/Keyboard-shortcuts) for details.

This entails a pretty big shift in functionality. In the same way that lists have behaved where one is active at any given moment, now individual tasks can also be active. The active task is highlighted in green, and you can select the next or previous task in the list using the up and down arrow keys. Once a task is selected you can do all the usual stuff to it using the keyboard: complete it, rename it, move it, set a due date, and delete it.

## New in v5.1.0

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