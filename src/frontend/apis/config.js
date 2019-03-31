import axios from 'axios';

const get = () => axios.get('/api/config');

const post = ({ storage_path, host, port, languages }) => axios.post('/api/config', {
  storage_path,
  host,
  port,
  languages,
});

const config = {
  get,
  post,
};

export default config;