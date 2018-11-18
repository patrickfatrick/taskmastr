# taskmastr

[![Circle CI](https://circleci.com/gh/patrickfatrick/taskmastr.svg?style=shield)](https://circleci.com/gh/patrickfatrick/taskmastr)
[![codecov.io](https://codecov.io/github/patrickfatrick/taskmastr/coverage.svg?branch=master)](https://codecov.io/github/patrickfatrick/taskmastr?branch=master)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

The server and front-end for [taskmastr.org](https://taskmastr.org) -- a web task manager built with Node, Koa, Mongo, Vue.

Please see [the wiki](https://patrickfatrick.gitbooks.io/taskmastr/content/) for information on how to use taskmastr.

# Features

taskmastr is...

- Fast
- Intuitive
- Unintrusive
- Mobile-friendly
- Fun

taskmastr has...

- Username/Password authentication.
- Email notifications when assigning a task a due date.
- Session storage for up to 30 days.
- Delete, reorder, and rename tasks or lists.
- Due dates and email notifications on the day of.
- 5-second undo when deleting a task or list.
- Night mode for those of us who work when we should be sleeping.
- Bright mode for those of us who are afraid of the dark.
- Now with COOL animations! More fun guaranteed!
- Keyboard shortcuts allow you to control basically everything.

taskmastr is updated regularly with new features

## Installation

To install and run it locally:

```bash
$ git clone git@github.com:patrickfatrick/taskmastr.git
$ cd taskmastr
$ npm install
$ npm run dev
```

Then navigate to localhost:3000. You'll need to have [mongodb](mongodb.com) installed.

## Development process

taskmastr uses CircleCI for continuous integration/deployment.

Push changes to master, watch the build at https://circleci.com/gh/patrickfatrick/workflows/taskmastr.

This should automatically build and push changes to the staging environment at taskmastr-staging.herokuapp.com.

If all looks good, fetch the staging branch, checkout the production branch and rebase it to staging, then push that to github. The same circleci workflow dashboard will show the production deploy. At this point changes should be on taskmastr.org.

```bash
$ git fetch
$ git checkout staging
$ git merge origin/staging
$ git checkout production
$ git rebase staging
$ git push origin production
```

## License

taskmastr is distributable under the terms of the [GNU GPL v3](./LICENSE).

## Screenshots

![taskmastr basic usage](/images/taskmastr-basic-usage-1.png)
![taskmastr basic usage 2](/images/taskmastr-basic-usage-2.png)
![taskmastr basic usage 3](/images/taskmastr-basic-usage-3.png)
![taskmastr basic usage 4](/images/taskmastr-basic-usage-4.png)
![taskmastr basic usage 5](/images/taskmastr-basic-usage-5.png)
![taskmastr modal](/images/taskmastr-modal.png)
