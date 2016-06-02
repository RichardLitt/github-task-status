'use strict'

const Octokat = require('octokat')
var octo
const Promise = require('bluebird')
// const depaginate = require('depaginate')
// const getGithubUser = require('get-github-user')
// For sublists: /^[ ]*- \[ \]/
const emptyCheck = /- \[ \]/
const filledCheck = /- \[x\]/

module.exports = function (org, opts, token) {
  var done = 0
  var undone = 0
  octo = new Octokat({
    token: token || process.env.GITHUB_OGN_TOKEN
  })

  return Promise.resolve(org)
    .map((url) => {
      // Prepend url to Owner/Repo
      if (!url.match(/^https:\/\/github.com/) && !url.match(/^https:\/\/api.github.com\/repos/)) {
        url = 'https://api.github.com/repos/' + url
      }
      // console.log('url', url)
      // Replace Owner/Repo#1 with Owner/Repo/issues/1
      url = url.replace(/#/, '/issues/')
      // Prepend API text to normal URL
      url = url.replace(/https:\/\/github.com/, 'https://api.github.com/repos')
      return url
    })
    .then((res) => octo.fromUrl(res).fetch())
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
