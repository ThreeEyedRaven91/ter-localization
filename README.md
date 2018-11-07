# ThreeEyedRaven's localization library

## Table of Contents



## Installation

### Install with npm or yarn

```
npm i -g ter-localization

# or if you have yarn

yarn add ter-localization
```

### Create localization folder

```
mkdir localization
cd localization
```

### Create `config.json` with following information

```
{
  "storage_path": "localization",
  "port": 5050,
  "host": "localhost",
  "languages": [
    "en",
    "jp"
  ]
}
```

With `storage_path` is the path from source's root folder

### Config inside the code

Write the translation centralization file, usually inside the `${storage_path}` folder

```
import en from './en';
import jp from './jp';
import { TranslateService } from 'ter-localization';

TranslateService.setConfig(require('./config'));
TranslateService.setTranslate({
  en,
  jp,
});

TranslateService.setLanguage('en');

export default TranslateService;
```

In side your component

```

import './language/index';
import {translateWrapper} from 'ter-localization';

render() {
  const { t } = this.props;

  return (
    <Text>
      {t('some_key')}
    </Text>
  );
}

export default translateWrapper('main')(App);
```

Run the service

```
node ./node_modules/ter-localization/dist/server/index.js -c ./localization/config.json
```

Then run your application. The new translation will be automatically added to all the translation file

## Global function
### Install global

```
yarn global add ter-localization
```


| Command               | Description                                        |
|-----------------------|----------------------------------------------------|
| [serve](#serve)       | Start server to listen and edit localization       |
| [scan](#scan-file)    | Scan the folder and add group and key if necessary |

### Serve

TER-Localization start a server to listen to new word added and provide UI edit for translation

The UI will be provided with information in the config file. Default will be `http://localhost:5050`

#### Params

| Params   | Short | Description         | Default                      |
|----------|-------|---------------------|------------------------------|
| --config | -c    | Path to config file | `./localization/config.json` |

### Scan file

Library will scan all the file within the directory to find the template `TranslateService.t('group')('key')` and automatically add group and key to localization file.

```
ter-localization scan
```

#### Params

| Params   | Short | Description                | Default                      |
|----------|-------|----------------------------|------------------------------|
| --file   | -f    | File / folder to search in | `./src`                      |
| --config | -c    | Path to config file        | `./localization/config.json` |


## Roadmap

| Version | Description                                       | Status      |
|---------|---------------------------------------------------|-------------|
| 0.1.x   | MVP: Able to load localization from file          | Done        |
| 0.2.x   | Local API allow to gather string without manually | Done        |
| 0.3.x   | Allow edit via Interface, default port            | Done        |
| 0.4.x   | Allow point API to separated server               | In Progress |