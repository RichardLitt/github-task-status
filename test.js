import test from 'ava'
import fn from './'

const Promise = require('bluebird')
const ghauth = Promise.promisify(require('ghauth'))
const authOptions = {
  configName: 'ghTaskStatus',
  note: 'Get GitHub task status',
  userAgent: 'ghTaskStatus',
  scope: ['repo']
}

test.before(async t => {
  await ghauth(authOptions).then((authData) => t.token = authData.token)
})


// test('Get results for Owner/Repo/issues/Number', t => {
//   return fn(['RichardLitt/github-task-status/issues/3'], {}, t.token).then(result => {
//     t.same(result, {
//       'done': 2,
//       'undone': 2,
//       'progressio': 'http://progressed.io/bar/50',
//       'progressioTitle': 'http://progressed.io/bar/50?title=2/4'
//     })
//   })
// })

// test('Get results for Owner/Repo#Number', t => {
//   return fn(['RichardLitt/github-task-status#3'], {}, t.token).then(result => {
//     t.same(result, {
//       'done': 2,
//       'undone': 2,
//       'progressio': 'http://progressed.io/bar/50',
//       'progressioTitle': 'http://progressed.io/bar/50?title=2/4'
//     })
//   })
// })

test('Get results for github.com/Owner/Repo/issues/Number', t => {
  return fn(['github.com/RichardLitt/github-task-status/issues/3'], {}, t.token).then(result => {
    t.same(result, {
      'done': 2,
      'undone': 2,
      'progressio': 'http://progressed.io/bar/50',
      'progressioTitle': 'http://progressed.io/bar/50?title=2/4'
    })
  })
})

// test('Get results for http://github.com/Owner/Repo/issues/Number', t => {
//   return fn(['http://github.com/RichardLitt/github-task-status/issues/3']).then(result => {
//     t.same(result, {
//       'done': 2,
//       'undone': 2,
//       'progressio': 'http://progressed.io/bar/50',
//       'progressioTitle': 'http://progressed.io/bar/50?title=2/4'
//     })
//   })
// })

// test('Get results for https://github.com/Owner/Repo/issues/Number', t => {
//   return fn(['https://github.com/RichardLitt/github-task-status/issues/3']).then(result => {
//     t.same(result, {
//       'done': 2,
//       'undone': 2,
//       'progressio': 'http://progressed.io/bar/50',
//       'progressioTitle': 'http://progressed.io/bar/50?title=2/4'
//     })
//   })
// })

// test('Get results for https://api.github.com/Owner/Repo/issues/Number', t => {
//   return fn(['https://api.github.com/RichardLitt/github-task-status/issues/3']).then(result => {
//     t.same(result, {
//       'done': 2,
//       'undone': 2,
//       'progressio': 'http://progressed.io/bar/50',
//       'progressioTitle': 'http://progressed.io/bar/50?title=2/4'
//     })
//   })
// })

// test('Get results for https://api.github.com/repos/Owner/Repo/issues/Number', t => {
//   return fn(['https://api.github.com/repos/RichardLitt/github-task-status/issues/3']).then(result => {
//     t.same(result, {
//       'done': 2,
//       'undone': 2,
//       'progressio': 'http://progressed.io/bar/50',
//       'progressioTitle': 'http://progressed.io/bar/50?title=2/4'
//     })
//   })
// })

// test(t => {
//   return fn('RichardLitt', {
//     since: '2016-00-16T15:21:08.104Z',
//     repo: 'get-issue-commenters'
//   }).then(result => {
//     t.throws(error, 'Since flag is an invalid date.')
//   })
// })
