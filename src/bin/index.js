#!/usr/bin/env node

import Helper from '../helpers/index';
import Sync from './sync';

if (Helper.argv.targets && Helper.argv.targets.length) {
  if (Helper.argv.targets[0] === 'scan') {
    require('./scan');
  }

  if (Helper.argv.targets[0] === 'serve') {
    require('../server/index');
  }

  if (Helper.argv.targets[0] === 'upload') {
    Sync.upload();
  }
}