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
    {
      type: 'input',
      input_key: 'spreadsheet_id',
      title: 'Spreadsheet Id',
      placeholder: 'Spreadsheet id (document id of g-drive)',
    },
    {
      type: 'input',
      input_key: 'sheet_id',
      title: 'Sheet Name',
      placeholder: 'Sheet name, default null',
    },
  ],
};