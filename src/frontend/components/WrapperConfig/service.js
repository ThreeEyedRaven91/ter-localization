import API from '../../apis';

let changeListeners = [];
let config = null;

const getConfig = () => config;

const setConfig = (config1) => {
  config = config1;
  changeListeners.forEach((l) => l(config));
};

const addListener = (object) => {
  if (changeListeners.every((item) => item !== object)) {
    changeListeners.push(object);
  }
};

const removeListener = (object) => {
  changeListeners = changeListeners.filter((item) => item !== object);
};

const download = async () => {
  const result = await API.config.get();
  const { data } = result;
  setConfig(data);
};

const ServiceConfig = {
  getConfig,
  addListener,
  removeListener,
  download,
};

export default ServiceConfig;