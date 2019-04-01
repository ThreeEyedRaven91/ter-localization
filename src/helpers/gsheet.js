import fs from 'fs';
import { google } from 'googleapis';
import Helper from './index';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = 'token.json';

const oAuthClient = () => {
  try {
    const content = fs.readFileSync('credentials.json');
    const credentials = JSON.parse(content);
    const {client_secret, client_id} = credentials.installed;
    return new google.auth.OAuth2(client_id, client_secret, `http://localhost:${Helper.config().port}/api/sync/authorization_success`);
  }
  catch (error) {
    return false;
  }
};

const setToken = (oAuth2Client) => {
  const token = fs.readFileSync(TOKEN_PATH);
  oAuth2Client.setCredentials(JSON.parse(token));
  return oAuth2Client;
}

const authorizeUrl = () => {
  try {
    const oAuth2Client = oAuthClient();
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'online',
      scope: SCOPES,
    });
    return authUrl;
  }
  catch (error) {
    return false;
  }
};

const saveToken = (code) => {
  return new Promise((resolve, reject) => {
    const oAuth2Client = oAuthClient();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) reject(err);

      oAuth2Client.setCredentials(token);
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) reject(err);
      });
      resolve(oAuth2Client);
    });
  })
};

const writeData = ({ auth, spreadsheetId, sheetId, values }) => {
  return new Promise((resolve, reject) => {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetId}!A1`,
      valueInputOption: 'RAW',
      resource: { values }
    }, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  })
};

const readData = ({ auth, spreadsheetId, sheetId }) => {
  return new Promise((resolve, reject) => {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetId}!A1:E`,
    }, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  })
}

const gSheet = {
  oAuthClient,
  saveToken,
  writeData,
  authorizeUrl,
  readData,
  setToken,
};

export default gSheet;