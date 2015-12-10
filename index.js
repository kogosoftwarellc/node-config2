module.exports = getConfig;

var isPlanObject = require('lodash/lang/isPlainObject');
var merge = require('lodash/object/merge');

/**
 * Returns a config object most appropriate for your environment.  The object
 * returned will have had properties from the provided config files assigned from
 * right to left in a recursive fasion.  This means envOverride key/values override
 * envs[env.NODE_ENV] key values which override default key/values.
 *
 * @param {Object} defaultConfig
 * @param {Object} envs - Each key is a string representing NODE_ENV and each value
 * is the relevant config for that environment I.E.
 * <pre>
 * {
 *  'development': {}
 *  'production': {}
 * }
 * </pre>
 * @param {Object} [envOverride] - A config object that overrides envs and defaults.
 * A sample might look like this:
 * <pre>
 * {
 *   someKey: process.env.SOME_KEY
 * }
 * </pre>
 *
 */
function getConfig(defaultConfig, envs, envOverride) {
  var config = {};
  var env = typeof process !== undefined  && process.env ?
            process.env :
            window;
  var envConfig = envs && envs[env.NODE_ENV];

  if (arguments.length < 2) {
    throw new Error('You must provide defaultConfig and envs.');
  }

  if (!isPlanObject(defaultConfig)) {
    throw new Error('defaultConfig must be a plain javascript object.');
  }

  if (!envConfig) {
    throw new Error('No configuration in envs was found for env ' + env.NODE_ENV + '.' +
        '  Was NODE_ENV set in process.env or window?');
  }

  if (!isPlanObject(envConfig)) {
    throw new Error('envs must only contain plain javascript objects.');
  }

  var args = [config, defaultConfig, envConfig];

  if (envOverride) {
    if (!isPlanObject(envOverride)) {
      throw new Error('envOverride must be a plain javascript object');
    }
    args.push(envOverride);
  }

  return merge.apply(null, args);
};
