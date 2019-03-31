import express from 'express';
import Helper from '../../helpers';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.get('/', (req, res) => {
  res.send(Helper.config());
});

router.post('/', (req, res) => {
  const { storage_path, host, port, languages } = req.body;
  const { configPath } = Helper.config();
  const configDir = path.dirname(configPath);
  const terDir = path.dirname(configDir);

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
    languages: languages.split(',').map(language => language.trim()),
  }

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

  res.send({
    code: 200,
    message: 'Ok',
  });
});

export default router;