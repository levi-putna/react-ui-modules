'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
    throw err;
});

const Webpack = require('webpack');
const WebpackDevServer = require('../../../lib/Server');
const webpackConfig = require('./webpack.config');
const compiler = Webpack(webpackConfig);

const devServerOptions = Object.assign({}, webpackConfig.devServer, {
  stats: {
    colors: true
  }
});

const server = new WebpackDevServer(compiler, devServerOptions);

try {
    server.listen(8080, '127.0.0.1', () => {
        console.log(chalk.blue('RUNNING'), 'Starting server on http://localhost:8080');
    });
} catch (e) {
    console.log(chalk.red('Build failed due to fatal error'), e);
}