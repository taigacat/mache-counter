const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const environment = process.env.NODE_ENV || 'dev';

/** @type import('webpack').Configuration */
module.exports = {
  mode: 'production',
  target: 'web',
  entry: {
    content: path.join(__dirname, 'src', 'pages', 'content', 'index.tsx'),
    background: path.join(__dirname, 'src', 'background', 'index.ts'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: ['source-map-loader', 'ts-loader'],
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        use: ['source-map-loader', 'babel-loader'],
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, `.env.${environment}`),
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/manifest.json', to: 'manifest.json' },
        { from: 'public/icon.png', to: 'icon.png' },
      ],
    }),
  ],
};
