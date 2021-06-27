const webpack = require('webpack');
const path = require('path');
const slsw = require('serverless-webpack');
const fs = require('fs');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

const getExternals = async () => {
  const IMPORT_MODE = 'commonjs2 ';
  const packageBuffer = await fs.promises.readFile('./package.json');
  const package = JSON.parse(packageBuffer.toString());
  const dependenciesEntries = Object.entries(package.dependencies);
  const externals = {};
  dependenciesEntries.map((name) => externals[name[0]] = IMPORT_MODE + name[0]);
  return externals;
};

const webpackConfig = async () => {
  const externals = await getExternals();
  return {
    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    optimization: { minimize: false },
    externals,
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
        { test: /\.tsx?$/, loader: 'ts-loader' },
      ],
    },
  };
};

module.exports = webpackConfig();
