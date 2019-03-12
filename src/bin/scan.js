#!/usr/bin/env node

import Helper from '../common/helpers/index';
import fs from 'fs';

processDirectory(Helper.argv.options.file || './src');

function processDirectory(path) {
  const files = fileList(path);
  const allWords = files.reduce((total, file) => [...total, ...processFile(file)], []);
  const allUniqueWord = allWords.reduce((total, word) => {
    if (total.every(w => word.group !== w.group || word.key !== w.key)) {
      total.push(word);
    }
    return total;
  }, []);

  allUniqueWord.map((word) => {
    addWord(word);
  })
}

function addWord({ group, key }) {
  const languages = Helper.io.read(Helper.config);
  Object.keys(languages).map((code) => {
    if (!languages[code][group]) {
      languages[code][group] = {};
    }
    if (!languages[code][group][key]) {
      languages[code][group][key] = key;
    }
  });

  Helper.io.write(Helper.config, languages);
}

function fileList(dir, filelist) {
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      filelist = fileList(dir + '/' + file, filelist);
    }
    else {
      filelist.push(dir + '/' + file);
    }
  });
  return filelist;
};

function processFile(path) {
  const content = fs.readFileSync(path, 'utf8');
  const translateRegex = /(TranslateService.t\(['"`].*['"`]\)\(['"`].*['"`][,)])/gm;

  const matches = content.match(translateRegex);
  if (matches) {
    const words = matches.map(match => exportGroupAndKey(match));

    return words;
  }

  return [];
}

function exportGroupAndKey(string) {
  const regex = /^TranslateService.t\(['"`](.*)['"`]\)\(['"`](.*)['"`][,)]/gm;
  const [match, group, key] = regex.exec(string);
  return { group, key };
}