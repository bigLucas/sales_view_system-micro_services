const webpack = require('webpack');
const path = require('path');
const slsw = require('serverless-webpack');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

/**
  TypeOrm does not work well with webpack, we inject a env variable here to be used at .env.ts
  to define how typeorm will receive it's params.
*/
slsw.lib.serverless.service.provider.environment.isWebpacked = true;

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  optimization: { minimize: false },
  externals: {
    'aws-lambda': 'commonjs2 aws-lambda',
    'aws-sdk': 'commonjs2 aws-sdk',
    'npm-which': 'commonjs2 npm-which',
    'pg': 'commonjs2 pg',
    'reflect-metadata': 'commonjs2 reflect-metadata',
    'typeorm': 'commonjs2 typeorm',
    'typescript-memoize': 'commonjs2 typescript-memoize',
    'axios': 'commonjs2 axios',
  },
  entry: slsw.lib.entries,
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  plugins: [
    new webpack.IgnorePlugin(/^pg-native$/),
    new FilterWarningsPlugin({
      exclude: [/mongodb/, /mssql/, /mysql/, /mysql2/, /oracledb/, /pg/, /pg-native/,
          /pg-query-stream/, /redis/, /sqlite3/, /react-native-sqlite-storage/, /sql.js/]
    })
  ],
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  target: 'node',
  module: {
    rules: [
      /** All files with a `.ts` or `.tsx` extension will be handled by `ts-loader` */
	  {test: /\.tsx?$/, loader: 'ts-loader'},
    ],
  },
};
