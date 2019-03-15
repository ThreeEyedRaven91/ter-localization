import en from './en.json';
import { TranslateService } from 'ter-localization';

TranslateService.setConfig(require('./config.json'));
TranslateService.setTranslate({
  en,
});

TranslateService.setLanguage('en');

export default TranslateService;