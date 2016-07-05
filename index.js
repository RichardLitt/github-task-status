'use strict'

const Octokat = require('octokat')
var octo
const Promise = require('bluebird')
// const depaginate = require('depaginate')
// const getGithubUser = require('get-github-user')
// For sublists: /^[ ]*- \[ \]/
const emptyCheck = /- \[ \]/
const filledCheck = /- \[x\]/

module.exports = function (url, opts, token) {
  octo = new Octokat({
    token: token || process.env.GITHUB_OGN_TOKEN
  })

  return Promise.each(url, (url) => {
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
  .map((res) => octo.fromUrl(res).fetch())
  .map((res) => {
    return {
      url: res.url,
      htmlUrl: res.htmlUrl,
      body: res.body.split('\n')
    }
  })
  .map((res) => {
    var done = 0
    var undone = 0

    return Promise.each(res.body, (line) => {
      var checkEmpty = emptyCheck.exec(line)
      if (checkEmpty && checkEmpty.index === 0) {
        undone += 1
      }
      var checkFilled = filledCheck.exec(line)
      if (checkFilled && checkFilled.index === 0) {
        done += 1
      }
    }).then(() => {
      return {
        url: res.url,
        htmlUrl: res.htmlUrl,
        done: done,
        undone: undone,
        progressio: 'http://progressed.io/bar/' + Math.round(done / (done + undone) * 100),
        progressioTitle: 'http://progressed.io/bar/' + Math.round(done / (done + undone) * 100) + `?title=${done}/${undone + done}`
      }
    })
  })
}
