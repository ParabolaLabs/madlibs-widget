import * as webpack from 'webpack';
import { resolve, join } from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as CopyPlugin from 'copy-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

const { HotModuleReplacementPlugin } = webpack;
const port = 3000;
const context = __dirname + '/src';

interface WebpackEnvironment {
  NODE_ENV: string;
}

module.exports = (env: WebpackEnvironment, argv: { mode: string }) => {
  const appEntryPoints = argv.mode === 'production'
  ? ['./index']
  : [
      `webpack-dev-server/client?http://localhost:${port}`,
      'webpack/hot/only-dev-server',
      './index'
    ];

  const config: webpack.Configuration = {
    name: 'client',
    target: 'web',
    context,
    entry: {
      app: appEntryPoints
    },
    output: {
      filename: '[name].js',
      path: resolve(__dirname, 'dist')
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', 'jsx']
    },
    devtool: argv.mode === 'production' ? 'source-map' : 'cheap-eval-source-map',
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.tsx?$/,
          loader: 'tslint-loader',
          exclude: /node_modules/,
          options: {
            configFile: resolve(__dirname, './tslint.json'),
            emitErrors: true,
            failOnHint: true,
            typeCheck: true
          }
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: 'dist',
              },
            },
            // Translates CSS into CommonJS
            {
              loader: 'css-loader',
              options: {
                url: false
              },
            },
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        hash: true,
        filename: 'index.html',
        inject: 'body'
      }),
      new MiniCssExtractPlugin(),
      new HotModuleReplacementPlugin(),
      new CopyPlugin({
        patterns: [
          { from: './images', to: '../dist/images' },
        ],
      }),
    ]
  };

  if (argv.mode === 'development') {
    config.devServer = {
      contentBase: join(__dirname, 'dist'),
      compress: true,
      port: 9000,
      writeToDisk: true,
    };
  }

  return config;
};
