import axios from 'axios';

const get = () => axios.get('/api/word');

const word = {
  get,
};

export default word;