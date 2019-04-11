/**
 * @returns {boolean} True if we are running on the cloud
 */
function isDeployed() {
  return !!process.env.isNow;
}

module.exports = isDeployed;
