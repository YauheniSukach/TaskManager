/* eslint-disable import/no-extraneous-dependencies */
const express = require("express");
const webpack = require("webpack");

const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

const open = require("opn");

const config = require("./webpack.config");

const { devServer: devServerConfig, output } = config;

const app = express();
const compiler = webpack(config);

const target = "localhost:8000";

app.use(
  webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: output.publicPath
  })
);

app.use(webpackHotMiddleware(compiler));

app.listen("7000", () => {
  // eslint-disable-next-line no-console
  console.log(`Project is running at http://localhost:7000/\n`);

  if (devServerConfig.open) {
    open(`http://localhost:7000`);
  }
});
