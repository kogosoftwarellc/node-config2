# config2 [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url]
> Simple env config handling for the browser and node.

## Highlights

* No getters/setters.
* Uses `window.NODE_ENV` in browsers.
* Uses `process.env.NODE_ENV` in node.
* Env specific config overrides default config.
* Able to override env specific and default config with environment variables.

## Installation

`config2` requires lodash as a peerDependency, so you'll want to have it handy:

```
npm install config2 lodash --save

```

## Usage

```javascript
var config2 = require('config2');

var defaultConfig = {
  someObject: {
    someOtherValue: 5
  }
};

var envConfig = {
  development: {
    someObject: {
      someValue: 6
    }
  },
  production: {
    someObject: {
      someValue: 7
    }
  }
};

var config = config2(defaultConfig, envConfig);
// assuming NODE_ENV is set to 'development';
config.someObject.someOtherValue // 5
config.someObject.someValue // 6

```

### Overriding the environment config at run time.

```javascript
// assuming SOME_VALUE was set to "8" in your environment.
var envOverrides = {
  someObject: {
    someValue: process.env.SOME_VALUE
  }
};

var config = config(defaultConfig, envConfig, envOverrides);
config.someObject.someValue // 8
```

## LICENSE
``````
The MIT License (MIT)

Copyright (c) 2015 Kogo Software LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
``````

[downloads-image]: http://img.shields.io/npm/dm/config2.svg
[npm-url]: https://npmjs.org/package/config2
[npm-image]: http://img.shields.io/npm/v/config2.svg

[travis-url]: https://travis-ci.org/kogosoftwarellc/node-config2
[travis-image]: http://img.shields.io/travis/kogosoftwarellc/node-config2.svg

[coveralls-url]: https://coveralls.io/r/kogosoftwarellc/node-config2
[coveralls-image]: http://img.shields.io/coveralls/kogosoftwarellc/node-config2/master.svg
