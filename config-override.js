const { removeModuleScopePlugin, override } = require('customize-cra');

module.exports = override(
  removeModuleScopePlugin()
);
