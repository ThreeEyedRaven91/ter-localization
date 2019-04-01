import express from 'express';
import Helper from '../../helpers';

const router = express.Router();

router.get('/authorization_url', (req, res) => {
  res.send({
    code: 200,
    data: {
      url: Helper.gSheet.authorizeUrl(),
    },
  });
});

router.get('/authorization_success', async (req, res) => {
  try {
    await Helper.gSheet.saveToken(req.query.code);
    res.redirect('/#/sync');
  }
  catch (error) {
    console.log(error);
    res.send({
      code: 500,
      message: error,
    });
  }
});

router.post('/upload', async (req, res) => {
  try {
    const data = Helper.io.read(Helper.config());
    const arrayData = Helper.io.toArray(data);

    let auth = await Helper.gSheet.oAuthClient();
    auth = Helper.gSheet.setToken(auth);

    await Helper.gSheet.writeData({
      auth,
      spreadsheetId: Helper.config().spreadsheet_id,
      sheetId: Helper.config().sheet_id,
      values: arrayData,
    });
    res.send({
      code: 200,
    });
  }
  catch (error) {
    console.log(error);
    res.send({
      code: 500,
      message: error,
    });
  }
});

router.post('/download', async (req, res) => {
  try {
    const data = Helper.io.read(Helper.config());

    let auth = await Helper.gSheet.oAuthClient();
    auth = Helper.gSheet.setToken(auth);
    const result = await Helper.gSheet.readData({
      auth,
      spreadsheetId: Helper.config().spreadsheet_id,
      sheetId: Helper.config().sheet_id,
    });

    const newData = Helper.io.fromArray(result.data.values, data);
    Helper.io.write(Helper.config(), newData);

    res.send({
      code: 200,
    });
  }
  catch (error) {
    console.log(error);
    res.send({
      code: 500,
      message: error,
    });
  }
});

export default router;