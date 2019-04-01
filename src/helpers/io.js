const fs = require('fs');

const write = (config, languages) => {
  const path = config.storage_path;
  const languagesCode = config.languages;
  if (!fs.existsSync(`${process.cwd()}/${path}`)) {
    fs.mkdirSync(`${process.cwd()}/${path}`);
  }

  languagesCode.map((code) => {
    const filePath = `${process.cwd()}/${path}/${code}.json`;

    const groups = languages[code];
    const orderedGroups = Object.keys(groups).sort().reduce((result, current) => {
      const words = groups[current];
      const orderedWords = Object.keys(words).sort().reduce((resultWord, currentWord) => {
        resultWord[currentWord] = words[currentWord];
        return resultWord;
      }, {});

      result[current] = orderedWords;
      return result;
    }, {});

    fs.writeFileSync(filePath, JSON.stringify(orderedGroups, null, 2));
  });
};

const read = (config) => {
  const path = config.storage_path;
  const languagesCode = config.languages;
  const result = {};

  languagesCode.map((code) => {
    const filePath = `${process.cwd()}/${path}/${code}.json`;
    if (fs.existsSync(filePath)) {
      result[code] = JSON.parse(fs.readFileSync(filePath));
    } else {
      result[code] = {};
    }
  });
  return result;
};

const toArray = (data) => {
  const languages = Object.keys(data);

  const groups = languages
    .reduce((result, language) => result.concat(Object.keys(data[language])), [])
    .filter(distinct);

  const headers = ['Group', 'Keyword', ...languages];
  const values = groups.reduce((group_result, group) => {
    const keys = languages
      .reduce((result, language) => result.concat(Object.keys(data[language][group])), [])
      .filter(distinct);

    const rows = keys.map(key => {
      const words = languages.map(language => data[language][group][key]);
      return [group, key, ...words];
    });

    return group_result.concat(rows);
  }, [headers]);

  return values;
};

const fromArray = (data, base = {}) => {
  const [ header, ...lines ] = data;
  const [ groupHeader, keywordHeader, ...languageKeys ] = header;

  const result = base;

  for (let i = 0; i < lines.length; i ++) {
    const [ group, key, ...words ] = lines[i];
    if (group.length == 0 || key.length == 0) {
      break;
    }

    for (let j = 0; j < languageKeys.length; j ++) {
      const languageKey = languageKeys[j];
      if (!result[languageKey]) {
        result[languageKey] = {};
      }

      if (!result[languageKey][group]) {
        result[languageKey][group] = {};
      }

      result[languageKey][group][key] = words[j];
    }
  }
  return result;
};

const distinct = (value, index, self) => {
  return self.indexOf(value) === index;
};

const IOHelper = {
  write,
  read,
  toArray,
  fromArray,
};

module.exports = IOHelper;