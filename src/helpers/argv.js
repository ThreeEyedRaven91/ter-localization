import argv from 'argv';

argv.option({
  name: 'config',
  short: 'c',
  type: 'string',
  description: 'Config file path',
});

argv.option({
  name: 'file',
  short: 'f',
  type: 'string',
  description: 'File path to scan',
});

const argvHelper = {
  ...argv.run(),
  argv,
};

export default argvHelper;