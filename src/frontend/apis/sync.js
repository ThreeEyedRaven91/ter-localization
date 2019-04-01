import axios from 'axios';

const getAuthorizationUrl = () => axios.get('/api/sync/authorization_url');
const upload = () => axios.post('/api/sync/upload');
const download = () => axios.post('/api/sync/download');

const sync = {
  getAuthorizationUrl,
  upload,
  download,
};

export default sync;