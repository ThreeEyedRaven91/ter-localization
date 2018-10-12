const fs = require('fs');
const bodyParser = require('body-parser')

const initServer = () => {
  const express = require('express');
  const config = require(`${process.cwd()}/.ter_localization/config.json`);

  const app = express();
  const port = config.port;
  const languages = read(config);
  write(config, languages);

  app.use( bodyParser.json() );
  app.post('/word/add', (req, res) => {
    const { group, key } = req.body;

    Object.keys(languages).map((code) => {
      if (!languages[code][group]) {
        languages[code][group] = {};
      }
      languages[code][group][key] = key;
    });

    write(config, languages);

    res.send({
      error: 0,
    });
  });

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};

const write = (config, languages) => {
  const path = config.storage_path;
  const languagesCode = config.languages;
  if (!fs.existsSync(`${process.cwd()}/${path}`)) {
    fs.mkdirSync(`${process.cwd()}/${path}`);
  }

  languagesCode.map((code) => {
    const filePath = `${process.cwd()}/${path}/${code}.json`;
    fs.writeFileSync(filePath, JSON.stringify(languages[code], null, 4));
  });
};

const read = (config) => {
  const path = config.storage_path;
  const languagesCode = config.languages;
  const result = {};

  languagesCode.map((code) => {
    const filePath = `${process.cwd()}/${path}/${code}.json`;
    if (fs.existsSync(filePath)) {
      result[code] = require(filePath);
    } else {
      result[code] = {};
    }
  });
  console.log(result);
  return result;
};

module.exports = {
  initServer,
};