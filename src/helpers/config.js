import argv from './argv';
import fs from 'fs';
import path from 'path';

const configPath = () => argv.options.config ? path.join(process.cwd(), argv.options.config) : path.join(process.cwd(), '/.ter/localization/config.json');

const config = () => {
  try {
    const configString = fs.readFileSync(configPath());
    return {
      ...JSON.parse(configString),
      configPath: configPath(),
    };
  }
  catch (error) {
    return {
      configPath: configPath(),
    };
  }
}

export default config;