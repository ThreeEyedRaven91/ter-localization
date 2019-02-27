const fs = require('fs');

const write = (config, languages) => {
  const path = config.storage_path;
  const languagesCode = config.languages;
  if (!fs.existsSync(`${process.cwd()}/${path}`)) {
    fs.mkdirSync(`${process.cwd()}/${path}`);
  }

  Object.keys(languagesCode).map((code) => {
    const filePath = `${process.cwd()}/${path}/${code}.json`;
    if (!fs.existsSync(filePath)) {
      fs.writeFile(filePath, '',(err, data) => {
        console.log('created')
      }); 
    }

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

  Object.keys(languagesCode).map((code) => {
    const filePath = `${process.cwd()}/${path}/${code}.json`;
    if (fs.existsSync(filePath)) {
      result[code] = JSON.parse(fs.readFileSync(filePath));
    } else {
      result[code] = {};
    }
  });
  return result;
};



const IOHelper = {
  write,
  read,
};

module.exports = IOHelper;