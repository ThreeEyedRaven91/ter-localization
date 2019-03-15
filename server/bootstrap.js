import  fs from 'fs';
import async from "async";

const defaultStoragePath = 'localization'; 
const configPath = `${process.cwd()}/${defaultStoragePath}`
const defaultContent = {
  storage_path:"localization",
  port:5050,host:"localhost",
  languages:{
    en:{},
    jp:{},
    vn:{},
    cn:"china"
  }
};


const runServer = () => {
  console.log('bootstrap success')
  require('./server');
}


const initializeLanguageFile = (listOfLanguages, runAfter) => {
  async.map(Object.keys(listOfLanguages), (item, callback) => {
    if (!fs.existsSync(`${configPath}/${item}.json`)) {
      fs.writeFile(`${configPath}/${item}.json`, JSON.stringify({}) , (err) => {
        if (err) throw err;
        console.log(`Create file ${configPath}/${item}.json success`)
        callback()
      })
    } else {
      callback()
    }
  }, () => {
    runAfter();
  })
}


// run when library started
const bootstrap = () => {
  // check the existence of folder
  if (!fs.existsSync(`${configPath}`)) {
    fs.mkdirSync(`${configPath}`);
  }
  // check the existence of config.json
  if (!fs.existsSync(`${configPath}/config.json`)) {
    fs.writeFile(`${configPath}/config.json`, JSON.stringify(defaultContent) , (err) => {
      if (err) throw err;
      initializeLanguageFile(defaultContent.languages, runServer) 
    })
  } else {
    fs.readFile(`${configPath}/config.json`,'utf8', (err, data) => {
      if (err) throw err;
      const currentData = JSON.parse(data);
      if (currentData.languages != null) {
        initializeLanguageFile(currentData.languages, runServer)
      } else {
        runServer();
      }
    })
  }
}


module.exports = bootstrap;