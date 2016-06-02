#!/usr/bin/env node
'use strict'

const meow = require('meow')
const githubTaskStatus = require('./')
const Promise = require('bluebird')
const ghauth = Promise.promisify(require('ghauth'))
const authOptions = {
  configName: 'ghIssueCommenters',
  note: 'Get GitHub issue commenters',
  userAgent: 'ghIssueCommenters',
  scope: ['repo']
}

const cli = meow([`
  Usage
    $ github-task-status [input]

  Options
    --foo  Lorem ipsum. [Default: false]

  Examples
    $ github-task-status
    unicorns & rainbows
    $ github-task-status ponies
    ponies & rainbows
`, {
  alias: {}
}])

Promise.try(() => ghauth(authOptions)})
.then((authData) => githubTaskStatus(cli.input[0], cli.flags, authData.token)})
.map((response) => {
  console.log(response)
})
