# ThreeEyedRaven's localization library

![UI Editor](/docs/images/01.UIEditor.png?raw=true "UI Editor")

## Motivation

One of the most painful problem that we repeatedly face when making application is localization (aka 
internationalization, i18n, multiple language, etc ...). There's a lot of library support localization in react-js, 
react-native, node-js, but the most painful thing was not how to implement the localization, but how to co-operate with 
client or 3rd-party team to make the translate. Thousand of text must be gathered, versioned, translated, updated in 
daily or even hourly basis.

TER-Localization, with new approach method, provide a solution which can speed up everything, include: 

* **Easy start without any configuration**
* **Collect the translate text from source code**
* **Collect the translate text run-time (even for dynamic text, like error return from server)**
* **Translate by UI, providable to customer / 3rd-party translate team**
* **Sync with google spreadsheet**

## User manual

|    | Guide                  | Path                                           |
|----|------------------------|------------------------------------------------|
| 01 | How to use GDrive Sync | [GDrive Sync](/docs/How_to_use_gdrive_sync.md) |

## Installation
### Install with npm or yarn

```
yarn add ter-localization
```

### Start to get the UI

```
./node_modules/.bin/ter-localization serve
```

![UI Editor](/docs/images/02.GettingStarted.png?raw=true "UI Editor")

Most of information is default. You can just click the button and go.

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

import './localization/index'; // one time import in very top class is okie. no need to import this in every file
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

Or you can use standalone code

```
import { TranslateService } from 'ter-localization';

// use it

TranslationService.t('group')('key');
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