module.exports = {
  context: __dirname,
  entry: "./lib/javascript/portfolio.js",
  output: {
    path: "./lib",
    publicPath: "/lib/",
    filename: "bundle.js",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  devtool: 'source-map'
};
