const createExpoWebpackConfig = require("@expo/webpack-config");
module.exports = function(env, argv) {
  env.mode = "development";
  const config = createExpoWebpackConfig(env, argv);
  return config;
};

const rule = {
  test: /postMock.html$/,
  use: {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
    },
  },
};