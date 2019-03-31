export default {
  elements: [
    {
      type: 'input',
      input_key: 'storage_path',
      title: 'Storage path',
      placeholder: 'Default: localization',
    },
    {
      type: 'input',
      input_key: 'host',
      title: 'Host',
      placeholder: 'Default: localhost',
    },
    {
      type: 'input',
      input_key: 'port',
      title: 'Port',
      placeholder: 'Default: 5050',
    },
    {
      type: 'input',
      input_key: 'languages',
      title: 'Languages',
      placeholder: 'Comma separated, default: en,fr,jp',
    },
  ],
};