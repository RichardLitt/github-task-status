# github-task-status [![Build Status](https://travis-ci.org/RIchardLitt/github-task-status.svg?branch=master)](https://travis-ci.org/RIchardLitt/github-task-status)

> Check the status of a GitHub issue tasklist


## Install

```
$ npm install --save github-task-status
```


## Usage

```js
const githubTaskStatus = require('github-task-status');

githubTaskStatus('unicorns');
//=> 'unicorns & rainbows'
```


## API

### githubTaskStatus(input, [options])

#### input

Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`  
Default: `false`

Lorem ipsum.


## CLI

```
$ npm install --global github-task-status
```

```
$ github-task-status --help

  Usage
    github-task-status [input]

  Options
    --foo  Lorem ipsum. [Default: false]

  Examples
    $ github-task-status
    unicorns & rainbows
    $ github-task-status ponies
    ponies & rainbows
```


## License

MIT © [Richard Littauer](http://burntfen.com)
