import request from './index';


export function getLanguage(url) {
  return request('language')
}