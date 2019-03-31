import express from 'express';
import Helper from '../../helpers';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.get('/', (req, res) => {
  res.send(Helper.config());
});

router.post('/', (req, res) => {
  const {
    storage_path,
    host,
    port,
    languages,
    spreadsheet_id,
    sheet_id
  } = req.body;

  // create config folder
  const { configPath } = Helper.config();
  const configDir = path.dirname(configPath);
  const terDir = path.dirname(configDir);
  const languageList = languages.split(',').map(l => l.trim());

  if (!fs.existsSync(terDir)) {
    fs.mkdirSync(terDir);
  }

  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir);
  }

  const config = {
    storage_path,
    host,
    port,
    languages: languageList,
    spreadsheet_id,
    sheet_id,
  };

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

  // create storage
  const storagePath = path.join(process.cwd(), storage_path);

  if (!fs.existsSync(storagePath)) {
    fs.mkdirSync(storagePath);
  }

  languageList.map(language => {
    const filepath = path.join(storagePath, `${language}.json`);
    if (!fs.existsSync(filepath)) {
      fs.writeFileSync(filepath, JSON.stringify({}, null, 2));
    }
  });

  res.send({
    code: 200,
    message: 'Ok',
  });
});

export default router;