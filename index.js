'use strict'

const Octokat = require('octokat')
var octo
const Promise = require('bluebird')
const moment = require('moment')
const _ = require('lodash')
// const depaginate = require('depaginate')
// const getGithubUser = require('get-github-user')
const emptyCheck = /[ ]*- \[ \] /g
const filledCheck = /[ ]*- \[x\] /g

var done = 0
var undone = 0

module.exports = function (org, opts, token) {
  octo = new Octokat({
    token: token || process.env.GITHUB_OGN_TOKEN
  })

  return Promise.resolve().then(() => octo.fromUrl(org).fetch())
    .then((res) => res.body.split('\n'))
    .map((body) => {
      var checkEmpty = emptyCheck.exec(body)
      if (checkEmpty && checkEmpty.index === 0) done += 1
      var checkFileld = filledCheck.exec(body)
      if (checkFileld && checkFileld.index === 0) undone += 1
      }).then(() => {
      return {done: done, undone: undone}
    })
  }
