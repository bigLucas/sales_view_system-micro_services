// Copyright 2004-present Facebook. All Rights Reserved.

const tsc = require('typescript'),
      tsConfig = require('./../tsconfig.json');

module.exports = {
  process(src, path) {
    return path.endsWith('.ts') || path.endsWith('.tsx') ? tsc.transpile(src, tsConfig.compilerOptions, path, []) : src
  },
};
