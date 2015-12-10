var assert = require('assert');
var config = require('./');
var defaultConfig = {
  whoa: 1,
  foo: 5,
  boo: {
    coo: 6
  }
};

var envs = {
  production: {
    foo: 3
  },
  development: {
    foo: 4
  }
};

process.env.SOME_VALUE = 5;

var envOverride = {
  foo: process.env.SOME_VALUE
};

var test;

// Without NODE_ENV
test = 'should throw when too few arguments are given';
assert.throws(function() {
  config();
}, /You must provide defaultConfig and envs/, test);

test = 'should throw when env is not set';
assert.throws(function() {
  config(defaultConfig, envs);
}, /No configuration in envs was found/, test);

test = 'should throw when defaultConfig is not a plan javascript object';
assert.throws(function() {
  config(null, envs);
}, /defaultConfig must be a plain javascript object/, test);

// With NODE_ENV set to an invalid value
process.env.NODE_ENV = 'asdfasdf';

test = 'should throw when no env is found in envs';
assert.throws(function() {
  config(defaultConfig, envs);
}, /No configuration in envs was found/, test);

test = 'should throw when env is not a plan javascript Object';
envs.asdfasdf = true;
assert.throws(function() {
  config(defaultConfig, envs);
}, /envs must only contain plain javascript objects/, test);
delete envs.asdfasdf;

// With NODE_ENV set to a valid value
process.env.NODE_ENV = 'production';

test = 'envOverride must be a plain javscript object when given';
assert.throws(function() {
  config(defaultConfig, envs, true);
}, /envOverride must be a plain javascript object/, test);

test = 'default values should be used when not set in envs';
assert.equal(config(defaultConfig, envs).whoa, 1, test);

test = 'envs should override default values';
assert.equal(config(defaultConfig, envs).foo, 3, test);

// envOverride
test = 'envOverride should override envs';
assert.equal(config(defaultConfig, envs, envOverride).foo, 5, test);

test = 'envOverride should override defaultConfig';
envOverride.whoa = 2;
assert.equal(config(defaultConfig, envs, envOverride).whoa, 2, test);

test = 'it should not override if undefined';
envOverride.foo = undefined;
assert.equal(config(defaultConfig, envs, envOverride).foo, 3, test);

// FINALLY it should use window when process.env is not available.
delete process.env;
global.window = {NODE_ENV: 'development'};

test = 'envs should override default values';
assert.equal(config(defaultConfig, envs).foo, 4, test);
