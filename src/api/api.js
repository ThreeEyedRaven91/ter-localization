import { create } from 'apisauce';

const api = create({
  baseURL: '',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Cache: 'no-cache',
  },
  timeout: 60000,
});

export function onGetWordData(params = {}) { return api.get('/api/word', params); }