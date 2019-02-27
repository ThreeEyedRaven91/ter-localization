import  fs from 'fs';
import async from "async";


// run when library started
const bootstrap = () => {
  const defaultStoragePath = 'localization'; 
  const configPath = `${process.cwd()}/${defaultStoragePath}`
  if (!fs.existsSync(`${configPath}`)) {
    fs.mkdirSync(`${configPath}`);
  }
  if (!fs.existsSync(`${configPath}/config.json`)) {
    const defaultContent = {storage_path:"localization",port:5050,host:"localhost",languages:{en:{},jp:{},vn:{},cn:"china"}};
    fs.writeFile(`${configPath}/config.json`, JSON.stringify(defaultContent) , (err) => {
      if (err) throw err
      
      async.map(Object.keys(defaultContent.languages), (item, callback) => {
        if (!fs.existsSync(`${configPath}/${item}.json`)) {
          fs.writeFile(`${configPath}/${item}.json`, JSON.stringify({}) , (err) => {
            if (err) throw err;
            console.log(`Create file ${configPath}/${item}.json success`)
            callback()
          })
        }
      }, () => {
        console.log('bootstrap success')
        require('./server');
      })   
    })
  } else {
    console.log('starting server')
    require('./server');
  }
}


module.exports = bootstrap;