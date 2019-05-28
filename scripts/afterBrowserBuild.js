const fse = require('fs-extra');
const path = require('path');
module.exports = function(ctx) {
  if (!ctx.opts.platforms.includes('browser')) return;
  const platformRoot = path.join(ctx.opts.projectRoot, 'platforms/browser');
  return fse.copy(ctx.opts.projectRoot + '/resources', platformRoot + '/www/resources/', /.*png$/);
};
