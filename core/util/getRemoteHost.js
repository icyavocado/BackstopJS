/**
 * Gets the custom remote host, otherwise return the default (http://127.0.0.1).
 *
 * @return     {string}   The remote host.
 */
module.exports = function getRemoteHost () {
  const remoteHost = process.env.BACKSTOP_REMOTE_HOST || 'http://127.0.0.1';
  return remoteHost;
};
