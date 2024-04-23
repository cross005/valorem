const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

console.log(__dirname);
module.exports = {
    context: __dirname,
    devtool: slsw.lib.webpack.isLocal ? 'eval-cheap-module-source-map' : 'source-map',
    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    entry: slsw.lib.entries,
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        modules: ['node_modules']
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js'
    },
    externals: ['aws-sdk'],
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                loader: 'ts-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            eslint: {
                files: './**/*.{ts,js}',
                enabled: false
            }
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({ terserOptions: { keep_classnames: true } })]
    }
};
