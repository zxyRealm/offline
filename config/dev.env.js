'use strict'
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"/api"',
  UPLOAD_API: '"http://192.168.11.123/manage"',
  IMPORTIP:'"151:80"'
});
