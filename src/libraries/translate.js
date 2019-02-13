import axios from 'axios';
import format from 'string-template';

let listeners = [];
let data = {
  translation: {

  },
  defaultLanguage: 'en',
  language: 'en',
  config: false,
};

const addListener = (l) => {
  if (listeners.every(_l => _l !== l)) {
    listeners.push(l);
  }
};

const removeListener = (l) => {
  listeners = listeners.filter(_l => _l !== l);
};

const trigger = () => {
  listeners.map(l => l());
};

const setConfig = (config) => {
  data.config = config;
};

const getTranslate = () => data.translation;

const setTranslate = (translate) => {
  data.translation = translate;
  trigger();
};

const getLanguage = () => data.language || data.defaultLanguage;

const setLanguage = (language) => {
  data.language = language;
  trigger();
};

const t = (group) => (key, params = {}) => {
  if (
    getTranslate()
    && getTranslate()[getLanguage()]
    && getTranslate()[getLanguage()][group]
    && getTranslate()[getLanguage()][group][key]
  ) {
    return format(getTranslate()[getLanguage()][group][key], params);
  } else {
    addWord(group, key);
    return key;
  }
}

const addWord = (group, key) => {
  axios.post(`http://${data.config.host}:${data.config.port}/api/word`, { group, key });
}

const TranslateService = {
  addListener,
  removeListener,
  getTranslate,
  setTranslate,
  getLanguage,
  setLanguage,
  setConfig,
  t,
};

module.exports = TranslateService;