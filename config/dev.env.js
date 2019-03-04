'use strict'
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');
module.exports = merge(prodEnv, {
  CONFIG: '"dev"',
  NODE_ENV: '"development"',
  BASE_API: '"/api"',
  OSS_PREFIX: '""'
});
