const path = require('path')

/** @type import('webpack').Configuration */
module.exports = {
  mode: 'production',
  entry: './src/script.ts',
  output: {
    path: path.resolve(__dirname, 'chrome', 'js'),
    filename: 'script.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
}
