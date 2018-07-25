// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const eslintFormatter = require('react-dev-utils/eslintFormatter');

const paths = {
  build: path.join(__dirname, "/../build"),
  entry: path.join(__dirname, "/../src/index.js"),
  doc: path.join(__dirname, "/../src/doc/index.js"),
  src: path.join(__dirname, "/../src")
};

module.exports = (baseConfig, env, defaultConfig) => {
  // Extend defaultConfig as you need.
  
  defaultConfig.resolve =  Object.assign(defaultConfig.resolve || {},
    {
      modules: [
          'node_modules',
          '../node_modules',
          paths.src
      ]
    }
  );

  // For example, add typescript loader:
  defaultConfig.module.rules.push({
    test: /\.(js|jsx)$/,
    enforce: 'pre',
    use: [
        {
            options: {
                formatter: eslintFormatter,

            },
            loader: require.resolve('eslint-loader'),
        },
    ],
    include: paths.appSrc,
});

defaultConfig.module.rules.push({
  test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg/],
  loader: require.resolve('url-loader'),
  options: {
      limit: 10000,
      name: 'media/[name].[hash:8].[ext]',
  },
});

defaultConfig.module.rules.push({
  test: /\.(js|jsx)$/,
  include: paths.src,
  loader: require.resolve('babel-loader'),
});

defaultConfig.module.rules.push({
  test: /\.(css|scss)$/,
  use: [
      'style-loader', {
          loader: 'css-loader',
          options: {
              modules: true,
              importLoaders: 1,
              minimize: true,
              sourceMap: true
          }
      }, {
          loader: require.resolve('postcss-loader'),
          options: {
              ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
              plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  autoprefixer(
                      {
                          browsers: [
                              '>1%',
                              'last 4 versions',
                              'Firefox ESR',
                              'not ie < 9', // React doesn't support IE8 anyway
                          ],
                          flexbox: 'no-2009',
                      }
                  ),
              ],
          },
      }, {
          loader: require.resolve('sass-loader'),
          options: {
              includePaths: [
                  paths.src
              ]
          }
      }
  ]
});

defaultConfig.module.rules.push({
  test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  loader: 'url-loader?limit=10000&mimetype=application/font-woff'
});

defaultConfig.module.rules.push({
  test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  loader: 'file-loader'
});

  //defaultConfig.resolve.extensions.push(".ts", ".tsx");

  return defaultConfig;
};