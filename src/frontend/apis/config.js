import axios from 'axios';

const get = () => axios.get('/api/config');

const post = ({ storage_path, host, port, languages, spreadsheet_id, sheet_id }) => axios.post('/api/config', {
  storage_path,
  host,
  port,
  languages,
  spreadsheet_id,
  sheet_id,
});

const config = {
  get,
  post,
};

export default config;