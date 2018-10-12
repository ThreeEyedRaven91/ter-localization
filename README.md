# ThreeEyedRaven's localization library

## Installation

### Install with npm or yarn

```
npm i -g ter-localization

# or if you have yarn

yarn add ter-localization
```

### Create configuration folder

```
mkdir .ter_localization
cd .ter_localization
```

### Create `config.json` with following information

```
{
  "storage_path": "data",
  "port": 5050,
  "host": "localhost",
  "languages": [
    "en",
    "fr",
    "th"
  ]
}
```

With `storage_path` is the path from source's root folder

### Config inside the code

Write the translation centralization file, usually inside the `${storage_path}` folder

```
# import language
import en from './en';
import fr from './fr';
import jp from './jp';

# import original TranslationService
import { TranslateService } from 'ter-localization';

# load config
TranslateService.setConfig(require('../.ter_localization/config'));

# add translation service
TranslateService.setTranslate({
  en,
  fr,
  jp,
});

# set language
TranslateService.setLanguage('fr');

# then export to use
export default TranslateService;
```

In side your component

```

import './language/index';
import {translateWrapper} from 'ter-localization';

# Somewhere with your render

render() {
  const { t } = this.props;

  return (
    <Text>
      {t('some_key')}
    </Text>
  );
}

# export your component with group `main`
export default translateWrapper('main')(App);
```

Now, start the listener server

```
./node_modules/.bin/ter-localization
```

Then run your application. The new translation will be automatically added to all the translation file


## Roadmap

| Version | Description                                       | Status      |
|---------|---------------------------------------------------|-------------|
| 0.1.x   | MVP: Able to load localization from file          | Done        |
| 0.2.x   | Local API allow to gather string without manually | Done        |
| 0.3.x   | Allow edit via Interface, default port            | In Progress |
| 0.4.x   | Allow point API to separated server               | To do       |