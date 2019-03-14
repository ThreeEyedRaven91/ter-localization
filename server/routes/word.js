import express from 'express';
import Helper from '../../common/helpers/index';

const router = express.Router();

/* Add new word. */
router.post('/', (req, res) => {
  const { group, key } = req.body;
  var socketio = req.app.get('socketio');

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
  socketio.sockets.emit('change word', key)

  res.send({
    error: 0,
  });
});

router.put('/', (req, res) => {
  const { group, key, word, language } = req.body;
  const languages = Helper.io.read(Helper.config);

  Object.keys(languages).map((code) => {
    if (!languages[code][group]) {
      languages[code][group] = {};
    }
    if (!languages[code][group][key]) {
      languages[code][group][key] = key;
    } else if (code === language) {
      languages[code][group][key] = word;
    }
  });

  Helper.io.write(Helper.config, languages);

  res.send({
    error: 0,
  });


})

/* Get all words */
router.get('/', (req, res) => {
  res.send(Helper.io.read(Helper.config));
});

module.exports = router;
