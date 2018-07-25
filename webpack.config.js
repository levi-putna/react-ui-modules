const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const eslintFormatter = require('react-dev-utils/eslintFormatter');

const paths = {
    build: path.join(__dirname, "/build"),
    entry: path.join(__dirname, "/src/index.js"),
    src: path.join(__dirname, "/src")
};

module.exports = {
    bail: true,
    devtool: 'source-map',
    entry: paths.entry,

    output: {
        path: paths.build,
        filename: "index.js",
        library: "react-component-lib",
        libraryTarget: "umd"
    },

    resolve: {
        modules: [
            'node_modules',
            paths.src
        ]
    },

    module: {
        rules: [
            // First, run the linter. It's important to do this before Babel processes the JS.
            {
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
            },

            // Any media files will be placed in the media directory with a hashed filename to avoide naming
            // conflicts.
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 10000,
                    name: 'media/[name].[hash:8].[ext]',
                },
            },

            // Process JS with Babel.
            {
                test: /\.(js|jsx)$/,
                include: paths.src,
                loader: require.resolve('babel-loader'),
            },

            // We are using Sass to give out styles a little mor format.
            // This also allows us to make use od Sass mixins to deal with some common behaviours.
            {
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
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            }
        ]
    },

    plugins: [

        // Moment.js is an extremely popular library that bundles large locale files
        // by default due to how Webpack interprets its code. This is a practical
        // solution that requires the user to opt into importing specific locales.
        // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
        // You can remove this if you don't use Moment.js:
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],

    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    }
}