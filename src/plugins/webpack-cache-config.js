module.exports = function webpackCachePlugin(context, options) {
  return {
    name: 'webpack-cache-plugin',
    configureWebpack(config, isServer, utils) {
      // Disable cache in CI to avoid VFileMessage serialization warnings
      if (process.env.CI) {
        return {
          cache: false,
        };
      }
      return {};
    },
  };
};
