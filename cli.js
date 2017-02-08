#!/usr/bin/env node
'use strict'

const meow = require('meow')
const githubTaskStatus = require('./')
const Promise = require('bluebird')
const ghauth = Promise.promisify(require('ghauth'))
const authOptions = {
  configName: 'ghTaskStatus',
  note: 'Get GitHub task status',
  userAgent: 'ghTaskStatus',
  scope: ['repo']
}

const cli = meow([`
  Usage
    $ github-task-status [input]

  Options
    -s, --sublists  Check for sublists, too

  Examples
    $ github-task-status https://api.github.com/repos/RichardLitt/github-task-status/issues/1
    {done: 6, undone: 1}
`, {
  alias: {s: 'sublists'}
}])

// Options
// --foo  Lorem ipsum. [Default: false]

Promise.try(() => ghauth(authOptions))
  .then((authData) => githubTaskStatus(cli.input, cli.flags, authData.token))
  .then((response) => {
    console.log(response)
  })
