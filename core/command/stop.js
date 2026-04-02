const http = require('http');
const getRemotePort = require('../util/getRemotePort');
const getRemoteHost = require('../util/getRemoteHost');
const logger = require('../util/logger')('stop');

module.exports = {
  execute: function () {
    const port = getRemotePort();
    const host = getRemoteHost();
    const stopUrl = `${host}:${port}/stop`;
    return new Promise((resolve, reject) => {
      logger.log('Attempting to ping ', stopUrl);
      http.get(stopUrl, (resp) => {
        resp.on('end', () => {
          logger.log('Stopping backstop remote: success');
          process.exit(0);
        });
      }).on('error', (error) => {
        // ECONNRESET is expected if the stop command worked correctly
        if (error.code === 'ECONNRESET') {
          logger.log('Stopping backstop remote: success');
          return process.exit(0);
        }
        logger.log('Stopping backstop remote: error');
        reject(error);
      });
    });
  }
};
