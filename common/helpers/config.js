import argv from './argv';

const configPath = argv.options.config ? `${process.cwd()}/${argv.options.config}` : `${process.cwd()}/localization/config.json`;
const config = require(configPath);

export default config;