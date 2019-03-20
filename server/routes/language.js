import express from 'express';
import Helper from '../../common/helpers/index';
import argv from '../../common/helpers/argv';
import fs from 'fs';

const router = express.Router();

/* Add new word. */
router.post('/', (req, res) => {
  const { languageCode, languageName } = req.body;
  const data = Helper.config;

  if (data.languages[languageCode]) {
    res.send({
      isSuccess: false,
      error: 'This language already exists'
    })
  } else {
    data.languages[languageCode] = languageName;
    const path = argv.options.config ? `${process.cwd()}/${argv.options.config}` : `${process.cwd()}/localization`;
    fs.writeFileSync(`${path}/config.json`, JSON.stringify(data))
    if (!fs.existsSync(`${path}/${languageCode}.json`)) {
      fs.writeFileSync(`${path}/${languageCode}.json`, JSON.stringify({}));
    }
    res.send({
      isSuccess: true,
      message: 'Added new language'
    })
  }
});


/* Get all words */
router.get('/', (req, res) => {
  const data = Helper.config;
  res.send({
    data: data.languages
  });
});

module.exports = router;
