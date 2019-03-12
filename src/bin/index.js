#!/usr/bin/env node

import Helper from '../common/helpers/index';

if (Helper.argv.targets && Helper.argv.targets.length) {
  if (Helper.argv.targets[0] === 'scan') {
    require('./scan');
  }

  if (Helper.argv.targets[0] === 'serve') {
    require('../server/index');
  }
}